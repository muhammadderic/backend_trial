const helmet = require("helmet");
const cors = require("cors");

function configureHelmet(app) {
  app.use(helmet());
}

function configureCors(app) {
  app.use(cors());
}

module.exports = {
  configureHelmet,
  configureCors,
}