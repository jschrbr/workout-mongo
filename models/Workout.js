const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercises",
    },
  ],
  totalDuration: Number,
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
