//Dependencies
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var models = require("../models");
var express = require("express");
var router = express.Router();

//"Home" get route
router.get('/', function(request,response) {
		models.burgers.findAll().then(function(data){
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


		});
});

router.get('/burgers', function(request,response) {
	//express callback response by calling burger.selectAllBurger
	burger.all(function(burger_data){
		//wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
		response.render('index', {burger_data});
	});
});

//post route -> back to index
router.post('/burgers/create', function(request, response) {
	//takes the request object using it as input for buger.addBurger
	burger.create(request.body.burger_name, function(result){
		//wrapper for orm.js that using MySQL insert callback will return a log to console, render back to index with handle
		console.log(result);
		response.redirect('/');
	});
});

//put route -> back to index
router.put('/burgers/update', function(request,response){
	burger.update(request.body.burger_id, function(result){
		//wrapper for orm.js that using MySQL update callback will return a log to console, render back to index with handle
		console.log(result);
		response.redirect('/');
	});
});

module.exports = router;
