const express = require("express");
const router = express.Router();
const {
  getWorkouts,
  newWorkout,
  updateWorkout,
  getWorkoutsRange,
} = require("../handlers/api-handler");

router.route("/api/workouts").get(getWorkouts).post(newWorkout);
router.route("/api/workouts/:id").put(updateWorkout);
router.route("/api/workouts/range").get(getWorkoutsRange);

module.exports = router;
