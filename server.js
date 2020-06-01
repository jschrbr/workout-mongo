// require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
let mongoose = require("mongoose");
let db = require("./models");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.route("/:action").get((req, res) => {
  return req.params.action
    ? res.sendFile(path.join(__dirname, "public", `${req.params.action}.html`))
    : res.sendFile(path.join(__dirname, "public", "index.html"));
});

app
  .route("/api/workouts")
  .get(async (req, res) => {
    try {
      dbWorkout = await db.Workout.find({}).populate("exercises");
      const lastWorkout = dbWorkout[dbWorkout.length - 1];
      const totalDuration = lastWorkout.exercises.reduce((acc, curr) => {
        return (acc += curr.duration);
      }, 0);

      dbWorkout[dbWorkout.length - 1].totalDuration = totalDuration;
      res.json(dbWorkout);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  })
  .post(async (req, res) => {
    try {
      dbWorkout = await db.Workout.create({
        day: new Date().setDate(new Date().getDate()),
      });
      res.json(dbWorkout);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });

app.route("/api/workouts/:id").put(async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    exerciseId = await db.Exercises.create(body);
    dbWorkout = await db.Workout.findByIdAndUpdate(
      id,
      { $push: { exercises: exerciseId } },
      { new: true }
    );
    return res.json(dbWorkout);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.route("/api/workouts/range").get((req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

/** Syncing our database and logging a message to the user upon success */
app.listen(PORT, function () {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
