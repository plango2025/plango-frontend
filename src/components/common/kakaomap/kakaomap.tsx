// KakaoMap.tsx

import  { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./kakaomap.css";
import { useMapContext } from "./MapContext";
import { scheduleSidebarModel } from "@/components/common/scheduleSidebar/scheduleSidebarModel"; // 경로 맞게 수정 필요

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  id: string | number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  imageUrl?: string;
  address?: string;
  phone?: string;
}

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { setMap } = useMapContext();
  const { scheduleResponse } = location.state || {};

  useEffect(() => {
    if (!scheduleResponse) {
      console.warn("scheduleResponse가 없습니다.");
      return;
    }

    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        initializeMap();
      } else {
        const script = document.createElement("script");
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=74c8dc378f658847aa618359c93435d0&autoload=false";
        script.async = true;
        script.onload = () => {
          window.kakao.maps.load(() => {
            initializeMap();
          });
        };
        document.head.appendChild(script);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      // scheduleSidebarModel 함수로 가공된 장소 리스트 받기
      const stepItemsWithImages: Place[] =
        scheduleSidebarModel(scheduleResponse);

      if (!stepItemsWithImages || stepItemsWithImages.length === 0) {
        console.warn("가공된 장소 목록이 없습니다.");
        return;
      }

      const centerLat = stepItemsWithImages[0].latitude;
      const centerLng = stepItemsWithImages[0].longitude;

      const mapInstance = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(centerLat, centerLng),
        level: 7,
      });

      setMap(mapInstance);

      let currentOverlay: any = null;

      stepItemsWithImages.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(
          place.latitude,
          place.longitude
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          title: place.name,
          clickable: true,
        });

        marker.setMap(mapInstance);

        window.kakao.maps.event.addListener(marker, "click", () => {
          if (currentOverlay) currentOverlay.setMap(null);

          const content = document.createElement("div");
          content.className = "custom-overlay";

          content.innerHTML = `
            <div class="custom-info-window">
              <div class="header">
                <h3>${place.name}</h3>
                <button class="close-btn" title="닫기">&times;</button>
              </div>
              ${
                place.imageUrl
                  ? `<img src="${place.imageUrl}" alt="${place.name}" onerror="this.style.display='none';" />`
                  : `<div style="color: #aaa; font-style: italic;">이미지 없음</div>`
              }
              <div class="description">${place.description || "설명 없음"}</div>
              <p class="address">${place.address || ""}</p>
              <p class="phone">${place.phone || ""}</p>
              <div class="actions">
                <button class="details-btn">상세보기</button>
                <button onclick="window.open('https://map.kakao.com/link/to/${encodeURIComponent(
                  place.name
                )},${place.latitude},${place.longitude}')">길찾기</button>
              </div>
              <div class="arrow"></div>
            </div>
          `;

          content
            .querySelector(".details-btn")
            ?.addEventListener("click", () => {
              window.location.href = `/place/${encodeURIComponent(place.name)}`;
            });

          content.querySelector(".close-btn")?.addEventListener("click", () => {
            if (currentOverlay) currentOverlay.setMap(null);
          });

          const customOverlay = new window.kakao.maps.CustomOverlay({
            content,
            position: markerPosition,
            yAnchor: 1,
            zIndex: 10,
          });

          customOverlay.setMap(mapInstance);
          currentOverlay = customOverlay;
        });
      });
    };

    loadKakaoMap();
  }, [scheduleResponse, setMap]);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
};

export default KakaoMap;
