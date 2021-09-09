const express = require("express");
const app = express();
const db = require("./../database/database");
const axios = require("axios");
const shop = require("../models/shop");
const sortArray = require('sort-array')

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
      'x-rapidapi-host': 'distance-calculator1.p.rapidapi.com',
      'x-rapidapi-key': '6c5ea82118msh3191aa4435b0726p1cad73jsn75936f5a9c5f'
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      const a = response.data.Distance
      return a
    })
    .catch(function (error) {
      console.error(error);
    });
  //return shortest_assigned_shop;
}

function calculateDistanceBetweenShopAndRider(
  shop_lat,
  shop_long,
  rider_shop,
  rider_long
) {
  return assigneRider;
}

exports.place_order = async (req, res) => {
  
  try {
    let coord = [];  
    const shop_details = []
    const user_coord = await db.user.findOne({
      where: { inc_id: "5" },
      attributes: ["lat", "long"],
      raw: true,
    });
    
    const shop_coord = await db.shop.findAll({
      attributes: ["inc_id", "shop_name", "lat", "long"],
      raw: true,
    });

    coord.push(shop_coord);
    var coordinates = coord[0];
    var promise = coordinates.map((data1) => {
      return calculateDistanceBetweenUserAndShop(user_coord.lat,user_coord.long,data1.lat,data1.long).then((data) => {
        let shops = {}         
        shops.inc_id = data1.inc_id
        shops.distance = data
        return shops
      });
    });
    
    await Promise.all(promise).then((data)=>{     
      const sorted = sortArray(data,{
        by:'distance',
      })    
      db.shop.findOne({
          attributes:['shop_name','fcm_token'],
          where:{inc_id:sorted[0].inc_id},
          raw:true
        }).then((data)=>{
          console.log(data);
          res.send(data)
        })
      
    })
    
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
    // const curr_lat = req.query.latitude
    // const curr_long = req.query.longitude
    const inc_id = req.query.inc_id;
    const data = await db.delivery_boy.update(
      {
        fcm_token: token,
        //   curr_lat: curr_lat,
        //   curr_long: curr_long
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
