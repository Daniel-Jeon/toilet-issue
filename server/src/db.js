import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/toilet-issue");

const db = mongoose.connection;

db.once("open", async () => console.log("🆗Connected DB🆗"));
db.on("error", (error) => console.error(error));
