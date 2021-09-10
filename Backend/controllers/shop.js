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

exports.set_user_fcm_token = async(req,res)=>{
  try {
    const token = req.query.token
    const inc_id = req.query.inc_id
    console.log(token);
    console.log(inc_id);
    const data = await db.user.update(
      {
        fcm_token: token
      },{
       where:{inc_id:inc_id}
      }
    )
    res.status(200).json({
      status: "success",
      message: "user token updated",
    });
} catch (error) {
    res.send(error)
}
}



exports.list_shop = async(req,res)=>{
try {
        const username = req.query.username
        const email = req.query.email
        const phone = req.query.phone
        const fname = req.query.fname
        const lname = req.query.lname 
        const shop_name = req.query.shop_name
        const curr_lat = req.query.latitude
        const curr_long = req.query.longitude
        const data = await db.shop.create({
          username: username,
          email: email,
          phone: phone,
          fname: fname,
          lname: lname,
          shop_name: shop_name,
          lat: curr_lat,
          long: curr_long
      })
      res.status(200).json({
        status: "success",
        message: "shop registered",
      });
} catch (error) {
  res.send(error)
}        
}

exports.set_fcm_token = async(req,res)=>{
  try {
      const token = req.query.token
      const inc_id = req.query.inc_id
      const data = await db.shop.update(
         {
            fcm_token: token,
         },
         {
            where:{inc_id:inc_id}
         }
  )
     res.status(200).json({
      status: "success",
      message: "shopkeeper token updated",
    });
  } catch (error) {
      res.send(error)
  }
  
}


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


exports.get_products_by_shop_id = async(req,res)=>{
  try {
    const id = req.query.id
    const data = await db.products.findAll({
      where:{shop_id:id}
    })
    if(data){
      res.status(200).json({
        status: "success",
        message: "product_data",
        total_items:data.length,
        data: data,
      });
    }  
    else{
      res.send('id not found')
    }
  
  } catch (error) {
    res.send(error);
  }
}


exports.show_active_orders = async(req,res)=>{
  const data = await db.shop_active_orders.findAll({
    where:{active_order:1},
    raw:true
  })
  res.status(200).json({
    status: "success",
    message: "active orders",
    number_of_active_orders:data.length,
    data
  });
}
exports.set_shop_order_delivered = async(req,res)=>{
  const order_id = req.query.order_id
  const data = db.shop_active_orders.update(
    {
      active_order:0
    },{
      where:{order_id:order_id}
    }
  )
  res.json({
    status: "success",
    message: "order_delivered",
    // number_of_active_orders:data.length,
    // data
  })
}