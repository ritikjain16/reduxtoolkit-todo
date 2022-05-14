const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const todoSchema = mongoose.Schema({
  todo: String,
  todoBy: {
    type: ObjectId,
    ref: "user",
  },
});

const ToDo = mongoose.model("todo", todoSchema);

module.exports = ToDo;
