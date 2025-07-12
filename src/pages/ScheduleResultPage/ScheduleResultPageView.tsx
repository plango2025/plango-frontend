import React from "react";
import KakaoMap from "@/components/common/kakaomap/kakaomap";
import ScheduleSidebar from "@/components/common/scheduleSidebar/scheduleSidebar";
import styles from "./ScheduleResultPageView.module.scss";
import { MapProvider } from "@/components/common/kakaomap/MapContext"; // MapContext에서 MapProvider 가져오기

function ScheduleResultPageView() {
  return (
    <MapProvider>
      <div className={styles.mainBody}>
        <div>
          <ScheduleSidebar />
        </div>
        <div className={styles.layout2}>
          <KakaoMap /> {/* Kakao 지도 컴포넌트 삽입 */}
        </div>
      </div>
    </MapProvider>
  );
}

export default ScheduleResultPageView;
