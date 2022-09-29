var mongoose = require("mongoose");
var teamsSchema = require("../schemas/teams");

var teams = mongoose.model("user", teamsSchema);

module.exports = teams;
