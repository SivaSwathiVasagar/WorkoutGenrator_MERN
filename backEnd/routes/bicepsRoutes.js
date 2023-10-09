const express = require("express");
const router = express.Router();
const Bicep = require("../models/biceps.js");

router.get("/", async (req, res) => {
  try {
    const bicepWorkout = await Bicep.find();
    return res.status(200).json(bicepWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const selectedBicepWorkout = await Bicep.findById(req.params.id);
    if (!selectedBicepWorkout) {
      res.send({ message: "No such workout exist in database" });
    } else {
      return res.status(200).json(selectedBicepWorkout);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const bicepWorkout = {
      name: req.body.name,
      primary_muscles: req.body.primary_muscles,
      sets: req.body.sets,
      reps: req.body.reps,
      experienceType: req.body.experienceType,
    };
    const bicep = await Bicep.create(bicepWorkout);
    return res.status(201).send(bicep);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const selectedbicepWorkout = await Bicep.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!selectedbicepWorkout) {
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
    const selectedbicepWorkout = await Bicep.findByIdAndRemove(req.params.id);
    if (!selectedbicepWorkout) {
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
