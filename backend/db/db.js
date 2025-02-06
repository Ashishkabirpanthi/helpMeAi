import mongoose from "mongoose";

function connect() {
    mongoose.connect(process.env.MONGOOSE_URI).then(function () {
        console.log("MongoDB connected");
    }).catch(function (error) {
        console.log("MongoDB connection failed", error);
    })
};

export default connect;