const express = require("express");
const rout = express.Router();
const stripe = require("stripe")(
    "sk_test_51KskpeSHjBg5lmSurt4SqD3pCCUpobVbDmiiIBlHHfJ8SbTcEQyF5lYeQuHn19QfgoaFWiGdx45r0d6OqRctJ0kN00N7v3pV4O"
  );
  const uuid = require("uuid").v4;



rout.post("/checkout", (req, res) => {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "Gourav Hammad",
        address: {
          line1: "TC 9/4 Old MES colony",
          postal_code: "452331",
          city: "Indore",
          state: "Madhya Pradesh",
          country: "India",
        },
      })
      .then((customer) => {
        return stripe.charges.create({
          amount: 2500, // Charing Rs 25
          description: "Web Development Product",
          currency: "INR",
          customer: customer.id,
        });
      })
      .then((charge) => {
        res.send("Success"); // If no error occurs
      })
      .catch((err) => {
        res.send(err); // If some error occurs
      });
  });

  module.exports = rout;