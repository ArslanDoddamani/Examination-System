import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGDB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected successfully to ${DB_NAME} DB_Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Mongoose Error ", error);
        process.exit(1);
    }
}

export default connectDB;