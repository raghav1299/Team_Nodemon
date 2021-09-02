var DataTypes = require("sequelize").DataTypes;
var _products = require("./products");
var _shopkeeper = require("./shopkeeper");
var _tags = require("./tags");
var _user = require("./user");

function initModels(sequelize) {
  var products = _products(sequelize, DataTypes);
  var shopkeeper = _shopkeeper(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    products,
    shopkeeper,
    tags,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
