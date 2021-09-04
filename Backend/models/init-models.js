var DataTypes = require("sequelize").DataTypes;
var _delivery_boy = require("./delivery_boy");
var _order_history = require("./order_history");
var _products = require("./products");
var _products_2 = require("./products_2");
var _shop = require("./shop");
var _tags = require("./tags");
var _user = require("./user");

function initModels(sequelize) {
  var delivery_boy = _delivery_boy(sequelize, DataTypes);
  var order_history = _order_history(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var products_2 = _products_2(sequelize, DataTypes);
  var shop = _shop(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  products_2.belongsTo(tags, { as: "tags_tag", foreignKey: "tags"});
  tags.hasMany(products_2, { as: "products_2s", foreignKey: "tags"});

  return {
    delivery_boy,
    order_history,
    products,
    products_2,
    shop,
    tags,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
