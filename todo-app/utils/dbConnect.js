import mongoose, { connection } from "mongoose";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('.env incorreto!');
}

const connectMongo = async () => {
    if (mongoose.connection.readyState > 0) {
        return;
    } try {
        await mongoose.connect(databaseUrl);
        console.log("MongoDB Conectado!")
    } catch (error) {
        console.error(error);
    }

}

export default connectMongo;