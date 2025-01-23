import { useEffect } from "react";

function App() {
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 지도 중심 좌표 (서울)
      level: 3, // 확대 레벨 (1~14)
    };
    const map = new window.kakao.maps.Map(container, options);
    console.log(map);
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "100%", // 지도의 가로 크기
        height: "500px", // 지도의 세로 크기
      }}
    ></div>
  );
}

export default App;
