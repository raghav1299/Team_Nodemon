const Sequelize = require("sequelize");
const tags = require("./../models/tags.js");
var db = {};

const sequelize = new Sequelize("shadowfax", "admin", "qwertop098", {
  host: "shadowfax1.cedjgswziywb.ap-south-1.rds.amazonaws.com",
  port: 3306,
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

let models = [
  require("./../models/products.js"),
  require("./../models/shop.js"),
  require("./../models/tags.js"),
  require("./../models/user.js"),
  require("./../models/delivery_boy"),
  require("./../models/order_history"),
  require("./../models/delivery_boy_history"),
  require("./../models/shop_active_orders"),
];

models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

//Apply associations
Object.keys(db).forEach((key) => {
  if ("associate" in db[key]) {
    db[key].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Relations

module.exports = db;
