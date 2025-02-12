import "./env.js";

import express, { json } from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", async (req, res) => {
  const params = {
    serviceKey: process.env.KRIC_KEY,
    ...req.query,
  };
  const url = process.env.KRIC_URL;
  const disabledUrl = url + "vulnerableUserInfo/stationDisabledToilet";
  const normalUrl = url + "convenientInfo/stationToilet";
  try {
    const disableResponse = axios.get(disabledUrl, {
      params,
    });
    const normalResponse = axios.get(normalUrl, {
      params,
    });
    const [disableJson, normalJson] = await Promise.all([
      disableResponse,
      normalResponse,
    ]);
    const cdData = disableJson.data.body;
    const cnData = normalJson.data.body;

    let dData = [];
    let nData = [];
    for (const data of cdData) {
      dData.push({
        ground: data.grndDvNm,
        floor: data.stinFlor,
        gateInOut: data.gateInotDvNm,
        exitNo: data.exitNo,
        dtlLoc: data.dtlLoc,
        gender: data.mlFmlDvNm,
      });
    }
    for (const data of cnData) {
      nData.push({
        ground: data.grndDvNm,
        floor: data.stinFlor,
        gateInOut: data.gateInotDvNm,
        exitNo: data.exitNo,
        dtlLoc: data.dtlLoc,
        gender: data.mlFmlDvNm,
      });
    }
    console.log(cdData);
    return res.status(200).json({ nData, dData });
  } catch (err) {
    console.error("외부 API 호출 실패:", err);
    return res.status(500).json({ error: "API 요청 실패" });
  }
});

app.listen(4000, "0.0.0.0", () => console.log("🆗Connected Server🆗"));
