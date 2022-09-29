var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mongoosastic = require('mongoosastic');
var rolesSchema = require("./roles");

var emailRegexp = /.+\@.+\..+/;

var usersSchema = new Schema({
	username: { type: String, required: true, unique:true },
	password: { type: String, required: true },
	role: {
        type: String,
        ref: "Role"
      },
	email: { type:String, required: true, match: emailRegexp },
  teams: {type: Array}
});

usersSchema.plugin(mongoosastic, {
  populate: [
    { path: 'role'}
  ]
});

module.exports = usersSchema;
