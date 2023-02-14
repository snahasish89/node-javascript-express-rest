const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"]
    },
    email: {
        type: String,
        required: [true, "Please add your name"]
    },
    phone: {
        type: String,
        required: [true, "Please add your name"]
    }
},
{
    timeStamp: true
});

module.exports = mongoose.model("Contact", contactSchema);