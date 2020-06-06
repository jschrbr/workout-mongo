require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 8080;
let mongoose = require("mongoose");
const routes = require("./controller/routes");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

routes(app);

/** Syncing our database and logging a message to the user upon success */
app.listen(PORT, function () {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
