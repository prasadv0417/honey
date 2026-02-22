export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate items price
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate shipping price (If order is over Rs 1000 then free, else Rs 50)
  const shippingPrice = itemsPrice > 1000 ? 0 : 50;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate total price
  state.totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice)
  );

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
