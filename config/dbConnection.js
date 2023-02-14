const mongos = require("mongoose");
const connectMongodb = async () => {
    try {
        const connect = await mongos.connect(process.env.MONGO_DB_CONN_STRING);
        console.log("Mongo db connected", connect.connection.host);
    } catch (err) {
        console.log(err); 
        process.exit(1)
    }
}
module.exports = connectMongodb;