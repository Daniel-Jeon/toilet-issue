import "./env.js";

import express, { json } from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(json());

app.get("/api", async (req, res) => {
  try {
    const response = await axios.get(process.env.KRIC_URL, {
      params: {
        railOprIsttCd: req.query.railOprIsttCd,
        lnCd: req.query.lnCd,
        stinCd: req.query.stinCd,
        format: "json",
        serviceKey: process.env.KRIC_KEY,
      },
      timeout: 10000,
    });
    console.log("외부 API 응답:", response.data);
    return res.status(200).json(response.data.body);
  } catch (error) {
    console.error("외부 API 호출 실패:", error.message);
    return res.status(500).json({ error: "API 요청 실패" });
  }
});

app.listen(4000, "0.0.0.0", () => console.log("🆗Connected Server🆗"));
