const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");

const validator = asyncHandler(async (req,res,next) => {
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        let token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN, (err,decoded) => {
            console.log("<<<<<<<<<<<<<<<<<"+err);
            if(err) {
                res.status(401);
                res.json({message : "User not authorized"});
            } else {
                console.log(decoded);
                next();
            }
        });
    }
    
})

module.exports = validator;