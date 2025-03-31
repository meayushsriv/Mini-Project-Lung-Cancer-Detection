import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('Connected!'))
        .catch((err) => { console.log(err) });

}

export default connectDB;