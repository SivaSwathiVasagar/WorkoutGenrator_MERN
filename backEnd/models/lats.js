// STEP 1: IMPORT MONGOOSE
const mongoose = require("mongoose");

// STEP:2 CREATE YOUR DATA SCHEMA
const latsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  primary_muscles: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  experienceType: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Intermediate",
  },
});

// STEP:3 CREATE YOUR MODEL USING SCHEMA
const Lats = mongoose.model("Lats", latsSchema);

//STEP:4 EXPORT
module.exports = Lats;
