const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "This is Required",
  },
  email: {
    type: String,
    required: "This is Required",
  },
  mobile: {
    type: Number,
    required: "This is Required",
  },
  city: {
    type: String,
    required: "This is Required",
  },
});

mongoose.model("Student", studentSchema);
