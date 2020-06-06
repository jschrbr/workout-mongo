const path = require("path");
const routes = ["/stats", "/exercise"];

module.exports = {
  handleHTML: (req, res) => {
    const {
      params: { [0]: param },
    } = req;
    return routes.includes(param)
      ? res.sendFile(path.join(__dirname, "../../public", `${param}.html`))
      : res.redirect("/");
  },
};
