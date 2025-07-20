// MapContext.tsx
import React, { createContext, useContext, useState } from "react";

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

interface MapContextType {
  map: any;
  setMap: React.Dispatch<React.SetStateAction<any>>;
  centerMapToLocation: (lat: number, lng: number) => void;
  showPlaceOverlay: (place: Place) => void;
}

const MapContext = createContext<MapContextType | null>(null);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [map, setMap] = useState<any>(null);
  const [currentOverlay, setCurrentOverlay] = useState<any>(null);

  const centerMapToLocation = (lat: number, lng: number) => {
    if (map) {
      const center = new window.kakao.maps.LatLng(lat, lng);
      map.setCenter(center);
      map.setLevel(3);
    }
  };

  const showPlaceOverlay = (place: Place) => {
    if (!map || !window.kakao) return;

    const markerPosition = new window.kakao.maps.LatLng(
      place.latitude,
      place.longitude
    );

    // 기존 오버레이 제거
    if (currentOverlay) {
      currentOverlay.setMap(null);
      setCurrentOverlay(null);
    }

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
      <button class="details-btn">상세보기</button>
      <button onclick="window.open('https://map.kakao.com/link/to/${encodeURIComponent(
        place.name
      )},${place.latitude},${place.longitude}')">길찾기</button>
    </div>
    <div class="arrow"></div>
  </div>
`;

    // 상세보기 버튼 클릭 시 페이지 이동
    content.querySelector(".details-btn")?.addEventListener("click", () => {
      window.location.href = `/place/${encodeURIComponent(place.name)}`;
    });
    const overlay = new window.kakao.maps.CustomOverlay({
      content,
      position: markerPosition,
      yAnchor: 1,
      zIndex: 10,
    });

    // 닫기 버튼 이벤트에 overlay 직접 접근하여 닫기 처리
    content.querySelector(".close-btn")?.addEventListener("click", () => {
      overlay.setMap(null);
      setCurrentOverlay(null);
    });

    overlay.setMap(map);
    setCurrentOverlay(overlay);
  };
  return (
    <MapContext.Provider
      value={{ map, setMap, centerMapToLocation, showPlaceOverlay }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
