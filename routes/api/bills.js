const express = require("express");
const router = express.Router();

const validateBillInput = require('../../validation/bill')

router.get("/test", (req, res) => res.json({ msg: "This is the bills route" }));

router.post("/", (req, res) => {
    const { errors, isValid } = validateBillInput(req.body)
}

// res.json({ msg: "you can create bills here" }));

module.exports = router;