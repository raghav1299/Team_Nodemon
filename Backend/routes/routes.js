const express = require("express");
const app = express();
const shop = require("./../controllers/shop");
const rider = require("./../controllers/rider");
const user = require("./../controllers/user");
//reg and login APIs
app.route("/register_user");
// app.route("/register_shop");
// app.route("/register_rider");

app.route("/login_user");
app.route("/login_shop");
app.route("/login_rider");

//shop APIs
app.route("/shop/list_shop").post(shop.list_shop);
app.route("/shop/list_products").post(shop.list_products);
app.route("/shop/get_products_by_shop_id").get(shop.get_products_by_shop_id);
// app.route("/shop/stock_update");
app.route("/shop/set_shop_token").patch(shop.set_fcm_token);

//user APIs
app.route("/user/create_user").post(user.create_user);
app.route("/user/get_all_products").get(shop.get_all_products);
app.route("/user/get_all_tags").get(shop.get_all_tags);
app.route("/user/get_product_using_inc_id").get(shop.get_prodcut_using_inc_id);
app.route('/user/get_user_details_by_username').get(user.get_user_details_by_username)
app.route('/user/get_order_history_of_user').get(user.get_order_history_of_user)
app.route("/add_to_cart");

app.route("/user/place_order").get(rider.place_order);

//post_rider
app.route("/rider/post_rider_details").post(rider.post_details);
app.route("/rider/set_fcm_token").patch(rider.set_fcm_token);
app
  .route("/rider/set_current_coordinates")
  .patch(rider.set_current_coordinates);

app
  .route("/rider/get_details_using_username")
  .get(rider.get_details_using_username);

app.route("/rider/get_all_riders").get(rider.get_all_riders);
app.route('/rider/get_active_orders').get(rider.get_active_orders)
app.route('/rider/set_order_delivered').patch(rider.set_order_delivered)
app.route("/payments");

module.exports = app;
