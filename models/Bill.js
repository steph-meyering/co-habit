const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    household: {
        type: Schema.Types.ObjectId,
        ref: "households",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Bill = mongoose.model("Bill", BillSchema);