import dotenv from "dotenv";

const envPath = `.env.${process.env.NODE_ENV || "development"}`;

dotenv.config({ path: envPath });
