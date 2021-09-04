const express = require("express");
const app = express();
const db = require("./../database/database");

exports.get_all_products = async (req, res) => {
  try {
    const data = await db.products.findAll();
    res.status(200).json({
      status: "success",
      message: "user_data",
      data: data,
    });
  } catch (error) {
    res.send(err);
  }
};


exports.get_all_tags = async(req,res)=>{
  try {
    const data = await db.tags.findAll();
    res.status(200).json({
      status: "success",
      message: "tags_data",
      data: data,
    });
  } catch (error) {
    res.send(err);
  }
}


exports.get_prodcut_using_inc_id = async(req,res)=>{
  try {
    const incId = req.query.inc_id
    console.log(incId);
    const data = await db.products.findOne({
      where:{inc_id:incId}
    })
    if(data){
      res.status(200).json({
        status: "success",
        message: "product_data",
        data: data,
      });
    }  
    else{
      res.send('inc_id not found')
    }
  
  } catch (error) {
    res.send(error);
  }
}

exports.list_products = async(req,res)=>{
   try {
     const p_name = req.query.product_name
     const mrp = req.query.mrp
     const image_address = req.query.image_address
     const shop_id = req.query.shop_id
     const tags_strings = req.query.tags_string
     const quantity = req.query.quantity
    //  console.log(p_name,mrp,image_address,shop_id,tags_strings,quantity);
     const data = await db.products.create({
        
          product_name: p_name,
          mrp: mrp,
          image_address: image_address,
          shop_id: shop_id,
          tags_string: tags_strings,
          quantity: quantity
        
     })
    //  console.log(data);
     console.log('data added');
     res.status(200).json({
      status: "success",
      message: "data added",
    });
   } catch (error) {
     res.send(error)
   }
}