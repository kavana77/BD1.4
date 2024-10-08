const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = cartTotal + newItemPrice;
  res.send(totalCartPrice.toString());
});
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let member = req.query.isMember;
  let discount;
  if (member === 'true') {
    discount = cartTotal - cartTotal * (discountPercentage / 100);
  } else {
    discount = cartTotal;
  }

  res.send(discount.toString());
});
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = cartTotal * (taxRate / 100);
  res.send(total.toString());
});
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let result;
  if (shippingMethod === 'Standard') {
    result = distance / 50;
  } else if (shippingMethod === 'Express') {
    result = distance / 100;
  }
  res.send(result.toString());
});
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;
  res.send(result.toString());
});
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = purchaseAmount * loyaltyRate;
  res.send(result.toString());
});
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
