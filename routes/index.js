var roles = require("./routers/roles");
var users = require("./routers/users");
var tasks = require("./routers/tasks");
var search = require("./routers/search");
var auth = require("./routers/auth");

module.exports = function (app) {
    
    app.get("/", function (req, res) {
        res.send("welcome to task manager");
    });
    
    //route middlewares
    app.use("/api/v1/auth", auth);
    app.use("/api/v1/roles", roles);
    app.use("/api/v1/users", users);
    app.use("/api/v1/tasks", tasks);
    app.use("/api/v1/search", search);
    
    /*app.get("*", function (req, res) {
        res.send("no route matched");
    });
    */
    
         
}

