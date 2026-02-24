import asyncHandler from 'express-async-handler';
import https from 'https';
import PaytmChecksum from 'paytmchecksum';
import Order from '../models/Order.js';

// @desc    Init Paytm payment
// @route   POST /api/payment/generate_token
// @access  Private
const generateToken = asyncHandler(async (req, res) => {
  const { orderId, amount, customerId } = req.body;

  if (!process.env.PAYTM_MID || process.env.PAYTM_MID === 'YOUR_PAYTM_MERCHANT_ID') {
    // Return mock token for testing if not configured
    console.log("Mocking Paytm Token Generate");
    return res.json({
       txnToken: "MOCK_TXN_TOKEN_12345",
       orderId,
       amount,
       mid: "MOCK_MID"
    });
  }

  const paytmParams = {};

  paytmParams.body = {
    requestType: "Payment",
    mid: process.env.PAYTM_MID,
    websiteName: process.env.PAYTM_WEBSITE || "WEBSTAGING",
    orderId: orderId,
    callbackUrl: process.env.PAYTM_CALLBACK_URL || `http://localhost:5000/api/payment/callback`,
    txnAmount: {
      value: String(amount),
      currency: "INR",
    },
    userInfo: {
      custId: customerId,
    },
  };

  try {
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MERCHANT_KEY
    );

    paytmParams.head = {
      signature: checksum,
    };

    const post_data = JSON.stringify(paytmParams);

    const options = {
      hostname: process.env.NODE_ENV === 'production' 
        ? 'securegw.paytm.in' 
        : 'securegw-stage.paytm.in',
      port: 443,
      path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${orderId}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": post_data.length,
      },
    };

    let response = "";
    const post_req = https.request(options, function (post_res) {
      post_res.on("data", function (chunk) {
        response += chunk;
      });

      post_res.on("end", function () {
        const result = JSON.parse(response);
        res.json({
          txnToken: result.body.txnToken,
          orderId,
          amount,
          mid: process.env.PAYTM_MID
        });
      });
    });

    post_req.write(post_data);
    post_req.end();
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Paytm Callback URL (Verify Signature)
// @route   POST /api/payment/callback
// @access  Public
const paymentCallback = asyncHandler(async (req, res) => {
  const paytmParams = {};
  for (const key in req.body) {
    if (key !== "CHECKSUMHASH") {
      paytmParams[key] = req.body[key];
    }
  }

  const paytmChecksum = req.body.CHECKSUMHASH;

  if (!paytmChecksum && ( !process.env.PAYTM_MERCHANT_KEY || process.env.PAYTM_MERCHANT_KEY === 'YOUR_PAYTM_MERCHANT_KEY')) {
      // Mock flow success
      console.log('Mocking Paytm Callback Success');
      const orderId = req.body.ORDERID;
      
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentStatus = 'Paid';
        order.orderStatus = 'Processing';
        order.paymentId = req.body.TXNID || 'MOCK_TXN_ID';
        await order.save();
        return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/success?orderId=${orderId}`);
      }
      return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/failed`);
  }

  const isVerifySignature = PaytmChecksum.verifySignature(
    paytmParams,
    process.env.PAYTM_MERCHANT_KEY,
    paytmChecksum
  );

  if (isVerifySignature) {
    if (req.body.STATUS === "TXN_SUCCESS") {
      // Update order status in DB
      const order = await Order.findById(req.body.ORDERID);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentStatus = 'Paid';
        order.orderStatus = 'Processing';
        order.paymentId = req.body.TXNID;
        await order.save();
        
        // Redirect to frontend success page
        res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/success?orderId=${order._id}`);
      } else {
        res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/failed`);
      }
    } else {
       // Redirect to failed payment page
       res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/failed`);
    }
  } else {
    // Checksum verification failed
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/payment/failed?error=checksum_failed`);
  }
});

export { generateToken, paymentCallback };
