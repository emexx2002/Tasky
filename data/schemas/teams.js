var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var teamsSchema = new Schema({
    name: {type: String, required:true},
	members: { type: Array, required: true, unique:true },
});



module.exports = teamsSchema;
