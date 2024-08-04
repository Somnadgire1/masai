const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            userNewUrlParser : true,
            userUnifiedTopology : true,
        });
        console.log("MongoDB connected");
    } catch (error) {
    console.log(error.message);
        process.exit(1);
    }
};
module.export = connectDB;