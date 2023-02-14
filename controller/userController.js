const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const userSchema = require("../routes/models/userModel");
const bcrypt = require("bcrypt");



//@desc Get all contacts
//@route GET /api/contacts
//@access public

const registerUser = asyncHandler( async (req,res) => {
    console.log("I am here registration");
    const {name,email,password} = req.body;
    if(!name || !password || !email) {
        res.status(400);
        throw new Error("All values are mandatory");
    }
    
    const userAvilable = await userSchema.findOne({email});
    console.log(">>>>>>>>>>>>>>>>");
    if(userAvilable) {
        res.status(400);
        throw new Error("User already exists")
    }

    const bcryptPassword = await bcrypt.hash(password,10);
    console.log(bcryptPassword);
    const user = await userSchema.create({
        name,
        email,
        password: bcryptPassword,
    });

    if (user) {
        res.status(201).json({_id: user._id,email: user.email,name:user.name});
    }
    res.status(201).json(user);
});



const loginUser = asyncHandler( async (req,res) => {
    
    const {email,password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await userSchema.findOne({email});
    if(!user) {
        res.status(400);
        throw new Error("user not found")
    }
    console.log("");
    if(await bcrypt.compare(password,user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.name,
                    email: user.email
                }
            },
            process.env.ACCESS_TOKEN,
            {expiresIn: "1m"}
        );
        res.status(200).json(accessToken);

    }
    res.json({message:"Login an usr"});
});


const currentUser = asyncHandler( async (req,res) => {
    console.log("Id param: "+req.params.id);
    const {email} = req.params.id;
    const user = await userSchema.findOne({email: req.params.id});
    if(user){
        res.json(user);
        res.status(200);
    } else {
        res.status(401)
        res.json("User not found for "+ email)
    }
});

module.exports = {registerUser,loginUser,currentUser};