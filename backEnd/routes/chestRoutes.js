const express = require("express");
const router = express.Router();
const Chest = require("../models/chest.js");

router.get("/", async (req, res) => {
  try {
    const chestWorkout = await Chest.find();
    return res.status(200).json(chestWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const selectedChestWorkout = await Chest.findById(req.params.id);
    if (!selectedChestWorkout) {
      res.send({ message: "No such workout exist in database" });
    } else {
      return res.status(200).json(selectedChestWorkout);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const chestWorkout = {
      name: req.body.name,
      primary_muscles: req.body.primary_muscles,
      sets: req.body.sets,
      reps: req.body.reps,
      experienceType: req.body.experienceType,
    };
    const chest = await Chest.create(chestWorkout);
    return res.status(201).send(chest);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const selectedChestWorkout = await Chest.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!selectedChestWorkout) {
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
    const selectedChestWorkout = await Chest.findByIdAndRemove(req.params.id);
    if (!selectedChestWorkout) {
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
