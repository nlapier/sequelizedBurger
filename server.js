//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override")
var exphbs = require("express-handlebars");
var sql = require("mysql")

var app = express();

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// Body Parser setup
app.use(bodyParser.urlencoded({
	extended: false
}))

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"))

//Add Handlebars to express
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Routing
var routes = require("./controllers/burgers_controller.js");
app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

//Port Listener
var PORT = 3000;
app.listen(PORT, function(){
	console.log("Listening on port " + PORT)
});


