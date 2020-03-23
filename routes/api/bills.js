const express = require("express");
const router = express.Router();
const Bill = require('../../models/Bill');
const passport = require("passport");

const validateBillInput = require('../../validation/bill')

router.get("/test", (req, res) => res.json({ msg: "This is the bills route" }));

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBillInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    const newBill = new Bill({
      title: req.body.title,
      amount: req.body.amount,
      user: req.user.id,
      household: req.user.household
    });
    newBill
      .save()
      .then(bill => res.json(bill))
      .catch(err => res.status(400).json({ invalidbill: "Invalid bill description or total"}));
  }
);

// all bills for household
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Bill.find({ household: req.user.household })
      .then(bills => res.json(bills))
      .catch(err => res.status(404).json({ nobillsfound: "No bills found" }));
  }
);

router.delete(
  "/:billId",
  (req, res) => {
    Bill.findByIdAndRemove(req.params.billId )
      .then(bills => res.json(bills))
      .catch(err =>
        res.status(404).json({ nobillsfound: "Couldn't delete that bill" })
      );
  }
);

router.patch(
  "/:billId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Bill.findByIdAndUpdate(
      req.params.billId,
      req.body,
      { new: true },
      (err, data) => {
        if (data) return res.json(data);
        if (err) return res.status(400).json("Error: " + err);
      }
    );
  }
);

module.exports = router;