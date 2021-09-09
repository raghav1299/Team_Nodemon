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
      'x-rapidapi-key': '7fedd8ef06msh8f98fe56bdc5403p1d21bdjsn0d979d79b0e6'
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
      'x-rapidapi-host': 'distance-calculator1.p.rapidapi.com',
      'x-rapidapi-key': '7fedd8ef06msh8f98fe56bdc5403p1d21bdjsn0d979d79b0e6'
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
      'x-rapidapi-host': 'distance-calculator1.p.rapidapi.com',
      'x-rapidapi-key': '39386cee5bmsh2d2f54a29313b6cp1d996ejsn87a6f7c25f4f'
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
  
}

exports.place_order = async (req, res) => {
  
  try {
    let coord = [];  
    let rider_coord = []
    const shop_details = []
    var c = 0;
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
      c = sorted[0].inc_id
      db.shop.findOne({
          attributes:['shop_name','fcm_token'],
          where:{inc_id:sorted[0].inc_id},
          raw:true
        }).then((data)=>{
          // console.log(data);
          res.send(data)
        })
      
    })
    
    const shop_coordinates = await db.shop.findOne({
      attributes:['lat','long'],
      where:{inc_id:c},
      raw:true
    })

    //console.log(shop_coordinates);

    const riderCoord = await db.delivery_boy.findAll({
      attributes: ["inc_id","curr_lat", "curr_long"],
      raw: true,
    })
    // console.log(riderCoord);
    rider_coord.push(riderCoord)
    var rider_coordinates = rider_coord[0]
    // console.log(rider_coordinates);
    var promise1 = riderCoord.map((data1)=>{
      // console.log(data1.curr_lat,data1.curr_long);
      return calculateDistanceBetweenUserAndRider(shop_coordinates.lat,shop_coordinates.long,data1.curr_lat,data1.curr_long).then((data)=>{
        // console.log(data);
        var rider_details = {}
        rider_details.inc_id = data1.inc_id
        rider_details.distance = data
        return rider_details;
      })

    })
   
    await Promise.all(promise1).then((data)=>{
      var sorted_rider = sortArray(data,{
        by: 'distance'
      })
      d = sorted_rider[0].inc_id
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
