const express = require("express");
const router = express.Router();
const Ab = require("../models/abs.js");

router.get("/", async (req, res) => {
  try {
    const abWorkout = await Ab.find();
    return res.status(200).json(abWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const selectedAbWorkout = await Ab.findById(req.params.id);
    if (!selectedAbWorkout) {
      res.send({ message: "No such workout exist in database" });
    } else {
      return res.status(200).json(selectedAbWorkout);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const abWorkout = {
      name: req.body.name,
      primary_muscles: req.body.primary_muscles,
      sets: req.body.sets,
      reps: req.body.reps,
      experienceType: req.body.experienceType,
    };
    const ab = await Ab.create(abWorkout);
    return res.status(201).send(ab);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const selectedAbWorkout = await Ab.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!selectedAbWorkout) {
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
    const selectedAbWorkout = await Ab.findByIdAndRemove(req.params.id);
    if (!selectedAbWorkout) {
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
