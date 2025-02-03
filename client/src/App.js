import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { useState } from "react";

import axios from "axios";

import code from "./code.json";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [toiletData, setToiletData] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    setSearchValue(value);
    if (value && value.length >= 2) {
      const results = code.filter((station) =>
        new RegExp(`${value}(역)?`, "i").test(station.STIN_NM)
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const handleStationClick = async (station) => {
    console.log("선택한 역:", station);
    setSearchValue(station.STIN_NM);
    setFilteredResults([]);
    const response = await axios(process.env.REACT_APP_SERVER_URL + "/api", {
      method: "get",
      params: {
        railOprIsttCd: station.RAIL_OPR_ISTT_CD,
        lnCd: station.LN_CD,
        stinCd: station.STIN_CD,
      },
    });
    console.log("res:", response.data);
    setToiletData(response.data);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="flex-1 overflow-y-auto mt-6 mb-6 pt-4 px-2">
        <form
          className="flex h-10 mb-2 items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="역명으로만 검색이 가능합니다."
            className="flex-1 border rounded-lg p-2 mr-2"
            value={searchValue}
            onChange={handleInputChange}
            onClick={handleInputChange}
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
        </form>

        {filteredResults.length > 0 && (
          <ul className="border rounded-lg mt-2 bg-white shadow-lg">
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

        {toiletData.length > 0 && (
          <>
            <div>
              {toiletData.map((data, index) => (
                <ul key={index}>
                  <li>{toiletData[index].dtlLoc}</li>
                </ul>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
