import React, { useState, useEffect } from "react";
import SearchBarPresenter from "@/components/common/searchBar/CommonSearchbar"; // 분리된 SearchBarPresenter 임포트
import cardStyles from "./CardView.module.scss"; // Card 전용 SCSS 모듈 임포트 (이제 CardView 내부에서 사용)

import {
  useTravelPlan,
  TravelPlanProvider,
} from "@/pages/ScheduleCreationPage/scheduleCreationFeatures/Stepper/StepperPages/StepPageContext"; // Context에서 travelPlan을 가져옴

// 카드 데이터의 타입을 정의하는 인터페이스
interface CardData {
  placeName: string;
  addressName: string;
  categoryName: string;
}

interface CardProps {
  placeName: string;
  addressName: string;
  categoryName: string;
  onCardClick?: (placeName: string) => void;
}

interface CardViewProps {
  cards: CardData[]; // 외부에서 받을 카드 데이터 배열
  onCardClick?: (placeName: string) => void; // 선택 핸들러
}

// CardView 컴포넌트 내부에 Card 컴포넌트 정의
const Card: React.FC<CardProps> = ({
  placeName,
  addressName,
  categoryName,
  onCardClick,
}) => {
  const { setTravelPlan } = useTravelPlan(); // Context에서 settravelPlan을 가져옴
  return (
    <div className={cardStyles.card}>
      <h2 className={cardStyles.cardTitle}>{placeName}</h2>
      <div className={cardStyles.cardContent}>
        <p className={cardStyles.dataItem}>
          <span className={cardStyles.dataLabel}>주소:</span> {addressName}
        </p>
      </div>
      <button
        className={cardStyles.circleButton}
        onClick={() => {
          console.log(`버튼 클릭: ${placeName}`);
          setTravelPlan((prev) => ({
            ...prev,
            required_places: [{ name: placeName, address: addressName }],
          }));
          onCardClick?.(placeName); // 부모에게 전달
        }}
      >
        ...
      </button>
      <div className={cardStyles.cardFooter}>
        <p className={cardStyles.dataItem}>
          <span className={cardStyles.dataLabel}>카테고리:</span> {categoryName}
        </p>
      </div>
    </div>
  );
};

const CardView: React.FC<CardViewProps> = ({ cards }) => {
  const globalStyles: React.CSSProperties = {
    backgroundColor: "#f0f2f5",
    margin: 0,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    boxSizing: "border-box",
  };

  const sampleData: CardData[] = [
    {
      placeName: "강원대학교 춘천캠퍼스",
      addressName: "강원특별자치도 춘천시 효자동 192-1",
      categoryName: "교육,학문 > 학교 > 대학교",
    },
    {
      placeName: "서울대학교 관악캠퍼스",
      addressName: "서울특별시 관악구 관악로 1",
      categoryName: "교육,학문 > 학교 > 대학교",
    },
    {
      placeName: "을지로3가역",
      addressName: "서울특별시 중구 을지로 122",
      categoryName: "교통,운송 > 지하철,전철 > 지하철역",
    },
    {
      placeName: "강릉대학교",
      addressName: "강원특별자치도 강릉시 죽헌길 7",
      categoryName: "교육,학문 > 학교 > 대학교",
    },
    {
      placeName: "강남역",
      addressName: "서울특별시 강남구 테헤란로 402",
      categoryName: "교통,운송 > 지하철,전철 > 지하철역",
    },
    {
      placeName: "춘천시청",
      addressName: "강원특별자치도 춘천시 시청로 11",
      categoryName: "공공,행정 > 시청",
    },
  ];

  // 검색 상태
  const [actualSelectedPlaceName, setActualSelectedPlaceName] =
    useState<string>("");
  // 필터링된 카드 데이터 상태
  const [filteredCards, setFilteredCards] = useState<CardData[]>(cards);

  // actualSelectedPlaceName이 변경될 때마다 카드 데이터를 필터링
  useEffect(() => {
    if (actualSelectedPlaceName) {
      const filtered = cards.filter((card) =>
        card.placeName.includes(actualSelectedPlaceName)
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(cards);
    }
  }, [actualSelectedPlaceName, cards]);

  return (
    <div style={globalStyles}>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>

      {/* 현재 검색 상태 표시 (선택 사항) */}
      <div
        style={{
          marginBottom: "20px",
          width: "100%",
          maxWidth: "700px",
          textAlign: "center",
        }}
      ></div>

      {/* 필터링된 카드들을 렌더링 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {filteredCards.length > 0 ? (
          filteredCards.map((data, index) => (
            <Card
              key={index}
              placeName={data.placeName}
              addressName={data.addressName}
              categoryName={data.categoryName}
            />
          ))
        ) : (
          <p style={{ color: "#888", marginTop: "50px" }}>
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default CardView;
