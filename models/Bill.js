const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Integer,
        required: true
    },
    payer: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
})

module.exports = Bill = mongoose.model("Bill", BillSchema);