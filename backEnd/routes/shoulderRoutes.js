const express = require("express");
const router = express.Router();
const Shoulder = require("../models/shoulder.js");

router.get("/", async (req, res) => {
  try {
    const shoulderWorkout = await Shoulder.find();
    return res.status(200).json(shoulderWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const selectedShoulderWorkout = await Shoulder.findById(req.params.id);
    if (!selectedShoulderWorkout) {
      res.send({ message: "No such workout exist in database" });
    } else {
      return res.status(200).json(selectedShoulderWorkout);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const shoulderWorkout = {
      name: req.body.name,
      primary_muscles: req.body.primary_muscles,
      sets: req.body.sets,
      reps: req.body.reps,
      experienceType: req.body.experienceType,
    };
    const shoulder = await Shoulder.create(shoulderWorkout);
    return res.status(201).send(shoulder);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const selectedShoulderWorkout = await Shoulder.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!selectedShoulderWorkout) {
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
    const selectedShoulderWorkout = await Shoulder.findByIdAndRemove(
      req.params.id
    );
    if (!selectedShoulderWorkout) {
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
