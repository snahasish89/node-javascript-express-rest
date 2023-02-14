const express = require("express");
const router = express.Router();
const {getContacts,getContactById,postContacts} = require('../controller/contactController')


router.route("/").get(getContacts).post(postContacts);
router.route("/:id").get(getContactById);

module.exports = router;