const express = require("express");
const router = express.Router();
const validator = require("../controller/tokenValidator/tokenValidator")
const { registerUser, loginUser, currentUser } = require("../controller/userController");

router.post("/register",registerUser);
router.post("/all", loginUser);
router.post("/login", loginUser);

router.get("/currentuser/:id", validator,currentUser);

module.exports = router;  