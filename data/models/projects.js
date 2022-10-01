var mongoose = require("mongoose");
var projectsSchema = require("../schemas/projects");

var projects = mongoose.model("projects", projectsSchema);

module.exports = projects;