const express = require("express");
const app = express();
const shop = require("./../controllers/shop");
//reg and login APIs
app.route("/register_user");
app.route("/register_shop");
app.route("/register_rider");

app.route("/login_user");
app.route("/login_shop");
app.route("/login_rider");

//shop APIs
app.route("/list_products").post(shop.list_products);
app.route("/stock_update");

//user APIs
app.route("/get_all_products").get(shop.get_all_products);
app.route("/get_all_tags").get(shop.get_all_tags)
app.route("/get_product_using_inc_id").get(shop.get_prodcut_using_inc_id)
app.route("/add_to_cart");
app.route("/place_order");

app.route("/payments");

module.exports = app;
