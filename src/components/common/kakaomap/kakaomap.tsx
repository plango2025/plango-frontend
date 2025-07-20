// KakaoMap.tsx

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./kakaomap.css";
import { useMapContext } from "./MapContext"; // 추가

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

const KakaoMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { setMap } = useMapContext(); // Context 사용
  const { scheduleResponse } = location.state || {};
  const days = scheduleResponse?.schedule?.days || [];

  useEffect(() => {
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

      const allPlaces: Place[] = days.flatMap((day) => day.places) || [];
      if (allPlaces.length === 0) return;

      const centerLat = allPlaces[0].latitude;
      const centerLng = allPlaces[0].longitude;

      const mapInstance = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(centerLat, centerLng),
        level: 7,
      });

      setMap(mapInstance); // <-- Context를 통해 전역 등록

      let currentOverlay: any = null;

      allPlaces.forEach((place) => {
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
                  ? `<img src="${place.imageUrl}" alt="${place.name}" />`
                  : ""
              }
              <div class="description">${place.description || "설명 없음"}</div>
              <p class="address">${place.address || ""}</p>
              <p class="phone">${place.phone || ""}</p>
              <div class="actions">
                <button onclick="window.open('https://map.kakao.com/link/to/${encodeURIComponent(
                  place.name
                )},${place.latitude},${place.longitude}')">길찾기</button>
              </div>
              <div class="arrow"></div>
            </div>
          `;

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
  }, [days]);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
};

export default KakaoMap;
