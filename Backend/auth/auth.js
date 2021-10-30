const express = require("express");
const app = express();

//sample code for JWT authenetication
const jwt = require("jsonwebtoken");
exports.allowifloggedin = async (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        if (!token) return res.status(401).send("Access Denied");
        jwt.verify(
            token,
            process.env.JWT_SECRET, {
                algorithm: "HS256"
            },
            (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({
                        error: "You need to be logged in to access this route"
                    });
                } else {
                    // console.log(user);
                    //transferring user details for futher user
                    req.user = user;
                    next();
                }
            }
        );
    } else {
        return res.status(401).json({
            error: "You need to be logged in to access this route"
        });
    }
};


module.exports = app;
