module.exports = function (app) {
  app.use(require("./routes/api-routes"));
  app.use(require("./routes/html-routes"));
};
