"use strict";
module.exports = function(sequelize, DataTypes){
	var burgers = sequelize.define("burgers", {
		burgerName: DataTypes.STRING,
		devoured: {
			type: DataTypes.STRING,
			value: false
		}
	}, {
		classMethods: {
			associate: function(models){
				//Associations??
			}
		}
	});
	return burgers;
}