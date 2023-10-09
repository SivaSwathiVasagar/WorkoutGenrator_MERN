const express = require("express");
const router = express.Router();
const Lat = require("../models/lats.js");

router.get("/", async (req, res) => {
  try {
    const latWorkout = await Lat.find();
    return res.status(200).json(latWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const selectedLatWorkout = await Lat.findById(req.params.id);
    if (!selectedLatWorkout) {
      res.send({ message: "No such workout exist in database" });
    } else {
      return res.status(200).json(selectedLatWorkout);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const latWorkout = {
      name: req.body.name,
      primary_muscles: req.body.primary_muscles,
      sets: req.body.sets,
      reps: req.body.reps,
      experienceType: req.body.experienceType,
    };
    const lat = await Lat.create(latWorkout);
    return res.status(201).send(lat);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const selectedLatWorkout = await Lat.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!selectedLatWorkout) {
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
    const selectedLatWorkout = await Lat.findByIdAndRemove(req.params.id);
    if (!selectedLatWorkout) {
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
