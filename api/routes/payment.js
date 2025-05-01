const express = require("express");
const axios = require("axios");
const { checkAuth } = require("../middleware/check-auth");
const router = express.Router();
const Order = require("../models/order");

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
router.post("/init", checkAuth, async (req, res) => {
  const { email, amount, metadata } = req.body;
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Payment Initialization Failed" });
  }
});

router.post(
  "/webhook",
  express.json({ verify: express.raw }),
  async (req, res) => {
    const event = req.body;

    if (event.event == "charge.success") {
      const paymentInfo = event.data;

      await Order.findByIdAndUpdate(paymentInfo.metadata.orderId, {
        status: "paid",
      }).exec();

      console.log(`Payment for  ${paymentInfo}`);
    }
    res.sendStatus(200);
  }
);

module.exports = router;
