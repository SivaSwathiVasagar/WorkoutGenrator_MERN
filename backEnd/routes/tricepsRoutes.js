const express = require("express");
const router = express.Router();
const Tricep = require("../models/triceps.js");

router.get("/", async (req, res) => {
  try {
    const tricepWorkout = await Tricep.find();
    return res.status(200).json(tricepWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const selectedTricepWorkout = await Tricep.findById(req.params.id);
    if (!selectedTricepWorkout) {
      res.send({ message: "No such workout exist in database" });
    } else {
      return res.status(200).json(selectedTricepWorkout);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const tricepWorkout = {
      name: req.body.name,
      primary_muscles: req.body.primary_muscles,
      sets: req.body.sets,
      reps: req.body.reps,
      experienceType: req.body.experienceType,
    };
    const tricep = await Tricep.create(tricepWorkout);
    return res.status(201).send(tricep);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const selectedTricepWorkout = await Tricep.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!selectedTricepWorkout) {
      res.send({
        message: "No such workout exist in database to Update",
      });
    } else {
      return res
        .status(200)
        .send({ message: "Selected Workout Updated successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const selectedTricepWorkout = await Tricep.findByIdAndRemove(req.params.id);
    if (!selectedTricepWorkout) {
      res.send({
        message: "No such workout exist in database to Delete",
      });
    } else {
      return res
        .status(200)
        .send({ message: "Selected Workout Deleted successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
