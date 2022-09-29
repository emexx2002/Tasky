var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mongoosastic = require('mongoosastic');
var usersSchema = require("./users");
var teamsSchema = require("./teams")

var tasksSchema = new Schema({
	name: { type: String, required: true },
	status: { type: String, required: true, 'enum': ['To Do', 'In Progress', 'Done'] },
	createdBy: { type: Schema.Types.ObjectId, ref: 'user', required: true, es_schema: usersSchema },
	teamMembers: {type: Schema.Types.ObjectId, ref: 'team', required: true, es_schema:teamsSchema},
	assignedTo: { type: Schema.Types.ObjectId, ref: 'user', required: true, es_schema: usersSchema }
});

tasksSchema.plugin(mongoosastic, {
  populate: 
  [
  	{ 
    	path: 'createdBy',
		populate: [{
			path: 'role'
		}]
	},
    { 
    	path: 'assignedTo',
    	populate: [{
			path: 'role'
		}]
    }
  ]
});

module.exports = tasksSchema;
