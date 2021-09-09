const express = require("express");
const app = express();
const db = require("./../database/database");


exports.create_user = async(req,res)=>{
    try {
        const username = req.query.username
        const email = req.query.email
        const phone = req.query.phone
        const fname = req.query.fname
        const lname = req.query.lname         
        const curr_lat = req.query.latitude
        const curr_long = req.query.longitude
        const location = req.query.location
        const city = req.query.city
        const state = req.query.state
        const country = req.query.country
        const pincode = req.query.pincode
        const data = await db.user.create({
          username: username,
          email: email,
          phone: phone,
          fname: fname,
          lname: lname,
          lat: curr_lat,
          long: curr_long,
          location: location,
          city: city,
          state: state,
          country: country,
          pincode: pincode,          
      })
      res.status(200).json({
        status: "success",
        message: "shop registered",
      });
} catch (error) {
  res.send(error)
}        
}


exports.get_user_details_by_username = async(req,res)=>{
  const username = req.query.username
  const data = await db.user.findOne({
    where:{username:username},
    raw:true
  })
  res.status(200).json({
    status: "success",
    message: "rider_data",
    data: data,
  });
}

exports.get_order_history_of_user = async(req,res)=>{
  const inc_id = req.query.inc_id
  const data = await db.order_history.findAll({
    where:{user_id:inc_id}
  })
  res.status(200).json({
    status: "success",
    message: "order history",
    past_orders: data.length,
    data: data,
  });
}