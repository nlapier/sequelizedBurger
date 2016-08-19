//Dependencies
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var models = require("../models");
var express = require("express");
var router = express.Router();

//"Home" get route
router.get("/", function(request,response){
	models.Burgers.findAll().then(function(data){
		//Loop through all burgers and sort them into "ready" or "devoured" arrays
		var devouredBurgers = [];
		var freshBurgers = [];

		for (var i = 0; i < data.length; i++){
			if (data[i].devoured){
				devouredBurgers.push(data[i]);
			} else{
				freshBurgers.push(data[i]);
			}
		};

		var allBurgers = {
			fresh: freshBurgers,
			devoured: devouredBurgers
		};

		response.render("index", allBurgers)
	});
});



//Add a burger
router.post("/create", function(request, response) {
	models.burgers.create({
		burgerName: request.body.burgerName
	}).then(function(){
		response.redirect("/");
	});
});

//Devour a burger
router.post("/devoured/:id", function(request, response){
	models.burgers.update(
		{devoured: true},
		{where: {id: request.body.id}}
	).then(function(){
		response.redirect("/");
	});
});

module.exports = router;
