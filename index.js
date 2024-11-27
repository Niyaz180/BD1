const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let discountPercetage = 10;
let taxRate = 5;
let loyaltyRate = 2;



app.get('/cart-total', (req, res) => {

  let newItemPrice = parseFloat(req.query.newItemPrice);
  let  cartTotal = parseFloat(req.query.cartTotal);
  let ans = newItemPrice + cartTotal
  return res.send(ans.toString())
});

app.get('/membership-discount', (req, res) => {

  let isMember = req.query.isMember;
  let  cartTotal = parseFloat(req.query.cartTotal);
  let ans = cartTotal - ((cartTotal*discountPercetage)/100);
  
  if(isMember)
  {    
    return res.send(ans.toString())
  }
  else
  {
    return res.send(cartTotal.toString())
  }

});
app.get('/calculate-tax', (req, res) => {

  let cartTotal = parseFloat(req.query.cartTotal);
  let ans = (cartTotal*taxRate)/100;

  return res.send(ans.toString())
});

app.get('/estimate-delivery', (req, res) => {

  let shippingMethod = req.query.shippingMethod;
  let  distance = parseFloat(req.query.distance);

  if(shippingMethod == "Standard")
  {
     return res.send((distance/50).toString())
  }
  else
  {
    return res.send((distance/100).toString())
  }
});

app.get('/shipping-cost', (req, res) => {

  let weight = parseFloat(req.query.weight);
  let  distance = parseFloat(req.query.distance);

  return res.send((weight * distance * 0.1).toString())
});

app.get('/loyalty-points', (req, res) => {

  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  return res.send((purchaseAmount*loyaltyRate).toString())
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
