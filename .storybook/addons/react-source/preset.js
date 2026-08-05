const path = require("path");

module.exports = {
  managerEntries(entry = []) {
    return [...entry, path.resolve(__dirname, "./manager")];
  }
};
