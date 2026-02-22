# Nature's Gold - Honey E-Commerce Platform

A production-ready full-stack e-commerce application built for a single-brand honey business. It features a React frontend, Node/Express backend, MongoDB database, and Paytm payment gateway integration.

## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Lucide Icons
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **Payment:** Paytm Payment Gateway integration

## 📂 Project Structure

- `/client` - React frontend built with Vite & Tailwind
- `/server` - Node.js Express API & MongoDB modeling

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a file named `.env` inside the `server` folder based on `.env.example`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_atlas_uri_here
JWT_SECRET=your_jwt_secret_key_here

# Paytm Credentials
PAYTM_MID=YOUR_PAYTM_MERCHANT_ID
PAYTM_MERCHANT_KEY=YOUR_PAYTM_MERCHANT_KEY
PAYTM_WEBSITE=WEBSTAGING
PAYTM_CALLBACK_URL=http://localhost:5000/api/payment/callback
```

### 2. Installation

Install dependencies for the root, client, and server simultaneously:

```bash
npm run install-all
```

> **Note:** Because the project was scaffolded cleanly, you MUST run this command to fetch all the `node_modules`.

### 3. Run the App Locally

To start both the React frontend and Node.js backend simultaneously, run:

```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## 📦 Deployment Guide

### Backend (Render)
1. Push your code to GitHub.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Point to your repository.
4. Set the **Root Directory** to `server`.
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add all standard Environment Variables.

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and import your GitHub repository.
2. Set the **Root Directory** to `client`.
3. Vercel will automatically detect Vite and run `npm run build`.
4. Deploy.

## 💳 Paytm Integration Implementation

This project implements the server-side architecture required by Paytm:
1. Client generates order and hits `/api/payment/generate_token`.
2. Server uses `paytmchecksum` to sign the payload with `PAYTM_MERCHANT_KEY` and receives a transaction token from Paytm servers via HTTP module.
3. Form is submitted to Paytm.
4. User completes payment, Paytm hits the `/api/payment/callback` route.
5. Server validates `CHECKSUMHASH`. If verified & TXN_SUCCESS, the DB updates the order to Paid and redirects back to the client UI.

*Note: Without active production credentials in `.env`, the server handles mocked fallbacks.*
