var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var projectsSchema = new Schema({
    name: {type: String, required:true},
	members: { type: Array, required: true, unique:true },
    owner:{type: Schema.Types.ObjectId, required:true}
});



module.exports = projectsSchema;
