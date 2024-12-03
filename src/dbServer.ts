import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const MONGO_URI  = process.env.MONGO_URI || '' ;;

console.log(MONGO_URI);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("Connected to the db");
    } catch (err) {
        console.error("Failed to connect to the db", err);
    }
};

export default connectToDatabase;