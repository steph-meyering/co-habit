const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChoreSchema = new Schema({
  household: {
    type: Schema.Types.ObjectId,
    ref: "households",    
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  assignedUser: {
    type: Schema.Types.ObjectId,
    ref: "users", 
    default: null
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  complete: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: Number,
    default: 1
  }
});

module.exports = Chore = mongoose.model("chore", ChoreSchema);
