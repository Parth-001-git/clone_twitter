import express from "express";
import dotenv from "dotenv";
// import mongoose from 'mongoose';

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectmongoDB.js";

dotenv.config();
const mongoURI = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 5000;


console.log(process.env.MONGODB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);


connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
