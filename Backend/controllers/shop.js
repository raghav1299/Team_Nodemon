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
      message: "user_data",
      data: data,
    });
  } catch (error) {
    res.send(err);
  }
}