const db = require("../../models");

module.exports = {
  getWorkouts: async (req, res) => {
    try {
      const dbWorkout = await db.Workout.find({}).populate("exercises");
      const lastWorkout = dbWorkout[dbWorkout.length - 1];
      lastWorkout.totalDuration = lastWorkout.exercises.reduce((acc, curr) => {
        return (acc += curr.duration);
      }, 0);
      return res.json(dbWorkout);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  newWorkout: async (req, res) => {
    try {
      // day should probably be unique, but project requirements werent very clear.
      const dbWorkout = await db.Workout.create({
        day: new Date().setDate(new Date().getDate()),
      });
      return res.json(dbWorkout);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  updateWorkout: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const exercises = await db.Exercises.create(body);
      const dbWorkout = await db.Workout.findByIdAndUpdate(
        id,
        { $push: { exercises } },
        { new: true }
      );
      return res.json(dbWorkout);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  getWorkoutsRange: async (req, res) => {
    try {
      const dbWorkout = await db.Workout.find({}).populate("exercises");
      res.json(dbWorkout);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
};
