import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/weather-way");

const db = mongoose.connection;

db.once("open", () => console.log("🆗Connected DB🆗"));
db.on("error", (error) => console.error(error));
