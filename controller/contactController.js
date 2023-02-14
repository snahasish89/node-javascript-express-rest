const asyncHandler = require("express-async-handler")
const contactModel = require("../routes/models/contactModel")
//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler( async (req,res) => {
    const contacts = await contactModel.find();
    res.json(contacts);
    
});

const postContacts = asyncHandler( async (req,res) => {
    console.log('Req body: ',req.body);
    const {name,phone,email} = req.body;
    if(!name || !phone || !email) {
        res.status(400);
        throw new Error('All fileds are mandatory.')
    }
    const contact = await contactModel.create({
        name,phone,email
    })
    res.status(201).json(contact);
});

const getContactById = (req,res) => {
    res.json({message:`Get app contacts for ${req.params.id}`});
};

module.exports  = {getContacts,getContactById,postContacts};