const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
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
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Bill = mongoose.model("Bill", BillSchema);