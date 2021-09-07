const express = require("express");
const app = express();
const db = require('./../database/database')
const axios = require('axios')


    function calculateDistanceBetweenUserAndShop(user_lat,user_long,shop_lat,shop_long){
        return shortest_assigned_shop
    }
    function calculateDistanceBetweenShopAndRider(shop_lat, shop_long, rider_shop, rider_long){
        return assigneRider
    }


    

exports.post_details = async(req,res)=>{
    try {
        const username = req.query.username
        const email = req.query.email
        const phone = req.query.phone
        const fname = req.query.fname
        const lname = req.query.lname
        const data = await db.delivery_boy.create({
        username: username,
        email: email,
        phone: phone,
        fname: fname,
        lname: lname
    })
  
    res.status(200).json({
        status: "success",
        message: "rider data pushed",
      });


    } catch (error) {
        res.send(error)
    }   

}

exports.get_fcm_token = async(req,res)=>{
    try {
        const token = req.query.token
        // const curr_lat = req.query.latitude
        // const curr_long = req.query.longitude
        const inc_id = req.query.inc_id
        const data = await db.delivery_boy.update(
           {
              fcm_token: token,
            //   curr_lat: curr_lat,
            //   curr_long: curr_long
           },
           {
              where:{inc_id:inc_id}
           }
    )
       res.status(200).json({
        status: "success",
        message: "rider token updated",
      });
    } catch (error) {
        res.send(error)
    }
    
}

exports.get_current_coordinates = async(req,res)=>{
    try {
        
        const curr_lat = req.query.latitude
        const curr_long = req.query.longitude
        const inc_id = req.query.inc_id
        const data = await db.delivery_boy.update(
           {              
              curr_lat: curr_lat,
              curr_long: curr_long
           },
           {
              where:{inc_id:inc_id}
           }
    )
       res.status(200).json({
        status: "success",
        message: "rider coordinates updated",
      });
    } catch (error) {
        res.send(error)
    }
}



//  exports.place_order = async(req,res)=>{
   

    

//     //send_notification_to_shop




//     //send_notification_to_rider
    
//  } 
    






