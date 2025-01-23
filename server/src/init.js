import "./env.js";

import express, { json } from "express";
import cors from "cors";
import "./db.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(json());

app.get("/", function (req, res) {
  return res.status(204).end();
});

app.listen(4000, "0.0.0.0", () => console.log("🆗Connected Server🆗"));
