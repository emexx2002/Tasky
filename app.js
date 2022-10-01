var express = require("express");
var routes = require("./routes");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
var config = require('./config');
const Role = require("./data/models/roles")

//application 
var app = express();
app.use(cors())

//JSON parser middleware
app.use(bodyParser.json());

//routing
routes(app);

//db connection
mongoose.connect("mongodb+srv://emeka_james:ga44dala5caka@cluster0.ziyks.mongodb.net/Tasky?retryWrites=true&w=majority", 
{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}
);
var db = mongoose.connection;
// console.log(db)
db.on('error', function (e) {
    console.log("Error connecting MongoDB: " + e.message);
});
db.once('open', function() {
  console.log("REST server connected to MongoDB");
});


//set secret variable
//app.set('topsecret', config.secret);

//listen
app.listen(process.env.PORT || 3000, function () {
	console.log("REST server listening on port 3000");
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
initial()

//exporting app for unit test
module.exports = app;

