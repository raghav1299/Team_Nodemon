const express = require("express");
const app = express();
const db = require("./../database/database");
const axios = require("axios");
const shop = require("../models/shop");
const sortArray = require("sort-array");
var token = "3347f3e961msh3ac9913da471a45p190f9fjsne9594165cf97";
const { nanoid } = require("nanoid");
const amqp = require("amqplib");
require("dotenv/config");

function calculateDistanceBetweenUserAndShop(
  user_lat,
  user_long,
  shop_lat,
  shop_long
) {
  var options = {
    method: "GET",
    url: "https://distance-calculator1.p.rapidapi.com/v1/getdistance",
    params: {
      start_lat: user_lat,
      start_lng: user_long,
      end_lat: shop_lat,
      end_lng: shop_long,
      unit: "kilometers",
    },
    headers: {
      "x-rapidapi-host": "distance-calculator1.p.rapidapi.com",
      "x-rapidapi-key": token,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      const a = response.data.Distance;
      return a;
    })
    .catch(function (error) {
      console.error(error);
    });
  //return shortest_assigned_shop;
}

function calculateDistanceBetweenUserAndRider(
  shop_lat,
  shop_long,
  rider_shop,
  rider_long
) {
  var options = {
    method: "GET",
    url: "https://distance-calculator1.p.rapidapi.com/v1/getdistance",
    params: {
      start_lat: shop_lat,
      start_lng: shop_long,
      end_lat: rider_shop,
      end_lng: rider_long,
      unit: "kilometers",
    },
    headers: {
      "x-rapidapi-host": "distance-calculator1.p.rapidapi.com",
      "x-rapidapi-key": token,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      const a = response.data.Distance;
      return a;
    })
    .catch(function (error) {
      console.error(error);
    });
}

function sendNotificationtoAtimabh(token, body) {
  var data = JSON.stringify({
    to: token,
    collapse_key: "type_a",
    priority: "high",
    notification: {
      body: body,
      title: "New Order",
    },
  });

  var config = {
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization:
        "Bearer AAAAHAqavWU:APA91bE_-nY4MGn8Vx0YVDBQ6jKIwwlKri0IpXSgZFrwrXfRMJu-H_nHwDbsuB_aThRL7AwOY9WskNfFwGcf7-aoUWHcw5KDbMXIuanyWZL4SdlJgE2tF9pnKo-jbNwigDg_yK2GcXiN",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

exports.place_order = async (req, res) => {
  try {
    let coord = [];
    let rider_coord = [];
    const shop_details = [];
    var c = 0;
    var over_all_products = [];
    var inc_id = req.body.inc_id;
    var orderid = nanoid();
    
    const order_history = req.body.orders;
    
    const promise2 = order_history.map(async (data) => {
   
      const product_data = await db.products.findOne({
        attributes: ["mrp", "product_name", "image_address"],
        where: { inc_id: data.inc_id },
        raw: true,
      });
      console.log(product_data);
      console.log(data);
      const placed_order = await db.shop_active_orders.create({
        order_id: orderid,
        product_name: product_data.product_name,
        image_address: product_data.image_address,
        quantity: data.quantity,
        active_order: 1,
      });
      const product_details = {};
      product_details.price = product_data.mrp * data.quantity;
      product_details.name = product_data.product_name;
      product_details.quantity = data.quantity;
      
      return product_details;
    });
   
    await Promise.all(promise2).then((data) => {
      over_all_products = data;
      
    });
    var total_price = over_all_products.reduce(
      (accumulator, current) => accumulator.price + current.price
    );
    
    const user_coord = await db.user.findOne({
      where: { inc_id: inc_id },
      attributes: [
        "lat",
        "long",
        "location",
        "city",
        "state",
        "pincode",
        "country",
      ],
      raw: true,
    });
   
    const shop_coord = await db.shop.findAll({
      attributes: ["inc_id", "shop_name", "lat", "long"],
      raw: true,
    });
    
    coord.push(shop_coord);
    var coordinates = coord[0];
    var promise = coordinates.map((data1) => {
    
      return calculateDistanceBetweenUserAndShop(
        user_coord.lat,
        user_coord.long,
        data1.lat,
        data1.long
      ).then((data) => {
        
        let shops = {};
        shops.inc_id = data1.inc_id;
        shops.distance = data;
       
        return shops;
      });
    });

    await Promise.all(promise).then((data) => {
      const sorted = sortArray(data, {
        by: "distance",
      });
     
      c = sorted[0].inc_id;
    
      db.shop
        .findOne({
          attributes: ["shop_name", "fcm_token"],
          where: { inc_id: c },
          raw: true,
        })
        .then((data) => {
          body = over_all_products;
         
          sendNotificationtoAtimabh(data.fcm_token, body);
          
        });
    });

    const shop_coordinates = await db.shop.findOne({
      attributes: ["lat", "long", "shop_address", "shop_name"],
      where: { inc_id: c },
      raw: true,
    });

    const riderCoord = await db.delivery_boy.findAll({
      attributes: ["inc_id", "curr_lat", "curr_long", "username"],
      raw: true,
    });
    rider_coord.push(riderCoord);
    var rider_coordinates = rider_coord[0];
    var promise1 = riderCoord.map((data1) => {
      return calculateDistanceBetweenUserAndRider(
        shop_coordinates.lat,
        shop_coordinates.long,
        data1.curr_lat,
        data1.curr_long
      ).then((data) => {
        var rider_details = {};
        rider_details.inc_id = data1.inc_id;
        rider_details.distance = data;
        return rider_details;
      });
    });
    await Promise.all(promise1).then((data) => {
      var sorted_rider = sortArray(data, {
        by: "distance",
      });
      d = sorted_rider[0].inc_id;
      db.delivery_boy
        .findOne({
          attributes: ["fcm_token", "username"],
          where: { inc_id: d },
          raw: true,
        })
        .then((data) => {
          var token = data.fcm_token;
          var body = `Pickup Location:- \n Latitude:- ${shop_coordinates.lat} Longitude:- ${shop_coordinates.long} \n Shop:-${shop_coordinates.shop_address} \n \n
                    Drop Location:- \n Latitude:- ${user_coord.lat} Longitude:- ${user_coord.long} \n Home Address:- Location - ${user_coord.location}, City - ${user_coord.city}, Pincode:- ${user_coord.pincode}, State - ${user_coord.state}, Country - ${user_coord.country}
        `;
          var shoplocation =
            shop_coordinates.shop_name + " " + shop_coordinates.shop_address;
          var droplocation =
            user_coord.location +
            " " +
            user_coord.city +
            " " +
            user_coord.state +
            " " +
            user_coord.pincode +
            " " +
            user_coord.country;
          db.delivery_boy_history
            .create({
              username: data.username,
              pickup_address: shoplocation,
              drop_address: droplocation,
              pickup_lat: shop_coordinates.lat,
              pickup_long: shop_coordinates.long,
              dest_lat: user_coord.lat,
              dest_long: user_coord.long,
              active_order: 1,
            })
            .then((data) => {
            });
          sendNotificationtoAtimabh(token, body);
        });
    });
    const latest_rider = await db.delivery_boy_history.findOne({
      order: [["inc_id", "DESC"]],
      raw: true,
    });
    var assigned_rider = latest_rider.username;
    res.status(201).json({
      status: "success",
      message: "order placed",
      shop_assigned: `${shop_coordinates.shop_name}`,
      delivered_by: assigned_rider,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.post_details = async (req, res) => {
  try {
    const username = req.query.username;
    const email = req.query.email;
    const phone = req.query.phone;
    const fname = req.query.fname;
    const lname = req.query.lname;
    const data = await db.delivery_boy.create({
      username: username,
      email: email,
      phone: phone,
      fname: fname,
      lname: lname,
    });

    res.status(200).json({
      status: "success",
      message: "rider data pushed",
    });
  } catch (error) {
    res.send(error);
  }
};

exports.set_fcm_token = async (req, res) => {
  try {
    const token = req.query.token;
    const inc_id = req.query.inc_id;
    const data = await db.delivery_boy.update(
      {
        fcm_token: token,
      },
      {
        where: { inc_id: inc_id },
      }
    );
    res.status(200).json({
      status: "success",
      message: "rider token updated",
    });
  } catch (error) {
    res.send(error);
  }
};

exports.set_current_coordinates = async (req, res) => {
  try {
    const curr_lat = req.query.latitude;
    const curr_long = req.query.longitude;
    const inc_id = req.query.inc_id;
    const data = await db.delivery_boy.update(
      {
        curr_lat: curr_lat,
        curr_long: curr_long,
      },
      {
        where: { inc_id: inc_id },
      }
    );
    res.status(200).json({
      status: "success",
      message: "rider coordinates updated",
    });
  } catch (error) {
    res.send(error);
  }
};

exports.get_details_using_username = async (req, res) => {
  try {
    const username = req.query.username;
    const data = await db.delivery_boy.findOne({
      where: { username: username },
    });
    res.status(200).json({
      status: "success",
      message: "rider_data",
      data: data,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.get_all_riders = async (req, res) => {
  try {
    const data = await db.delivery_boy.findAll({
      //   where: { username: username },
    });
    res.status(200).json({
      status: "success",
      message: "riders_data",
      total_riders: data.length,
      data: data,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.get_active_orders = async (req, res) => {
  try {
    const username = req.query.username;
    const active_orders = req.query.active_orders;
    const data = await db.delivery_boy_history.findAll({
      where: {
        username: username,
        active_order: active_orders,
      },
    });
    res.status(200).json({
      status: "success",
      message: "active orders",
      total_riders: data.length,
      data: data,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.set_order_delivered = async (req, res) => {
  try {
    const username = req.query.username;
    const inc_id = req.query.inc_id;
    const data = await db.delivery_boy_history.update(
      { active_order: 0 },
      {
        where: {
          username: username,
          inc_id: inc_id,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "order delivered",
      data: data,
    });
  } catch (error) {
    res.send(error);
  }
};
