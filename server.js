const express = require('express');
const connectMongodb = require('./config/dbConnection');
const errorHandler = require('./errorHandler/errorHandler');
const dotenv = require('dotenv').config();
connectMongodb();
const app = express();

const port = process.env.SERVER_PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require('./routes/contact'));
app.use("/api/users", require('./routes/users'));
app.use(errorHandler)
app.listen(port, () => {
console.log(`App server started on ${port}`);
});