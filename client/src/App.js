import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { useState } from "react";

import axios from "axios";

import code from "./code.json";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [nData, setNData] = useState([]);
  const [dData, setDData] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    setSearchValue(value);

    if (value) {
      const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`${escapedValue}(역)?`, "i");

      const results = code.filter((station) => regex.test(station.STIN_NM));
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const handleStationClick = async (station) => {
    console.log("선택한 역:", station);
    setSearchValue(station.STIN_NM);
    setFilteredResults([]);
    const params = {
      format: "json",
      railOprIsttCd: station.RAIL_OPR_ISTT_CD,
      lnCd: station.LN_CD,
      stinCd: station.STIN_CD,
    };
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL, {
        params,
        timeout: 10000,
      });
      console.log(response.data);
      setDData(response.data.dData);
      setNData(response.data.nData);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="flex-1 overflow-y-auto mt-6 mb-6 pt-4 px-2">
        <form
          className="flex h-10 mb-2 items-center relative"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="역명으로만 검색이 가능합니다."
            className="flex-1 border rounded-lg p-2 mr-2"
            value={searchValue}
            onChange={handleInputChange}
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/5974/5974916.png"
            alt=""
            className="h-8"
            onClick={() => {
              setSearchValue("");
              setFilteredResults([]);
            }}
          />

          {filteredResults.length > 0 && (
            <ul className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto mt-2">
              {filteredResults.map((station) => (
                <li
                  key={station.NUM}
                  onClick={() => handleStationClick(station)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {`${station.LN_NM} ${station.STIN_NM}`}
                </li>
              ))}
            </ul>
          )}
        </form>

        {filteredResults.length > 0 && (
          <ul className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {filteredResults.map((station) => (
              <li
                key={station.NUM}
                onClick={() => handleStationClick(station)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {`${station.LN_NM} ${station.STIN_NM}`}
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
