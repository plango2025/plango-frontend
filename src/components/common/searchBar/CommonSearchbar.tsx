import React, { useState, useEffect, useRef } from "react";
import styles from "./CommonSearchbar.module.scss";
import { useTravelPlan } from "@/pages/ScheduleCreationPage/scheduleCreationFeatures/Stepper/StepperPages/StepPageContext";
import { LocationSuggestion } from "./locationsuggestion";
import axios from "axios";
import CardView from "@/pages/ScheduleCreationPage/scheduleCreationFeatures/components/card/CardView"; // CardView 컴포넌트 임포트"
type SearchBarMode = "button" | "autocomplete" | "selected";

type SearchBarPresenterProps = {
  mode: SearchBarMode;
  onSearch?: (text: string) => void;
};

const BASE_URL = "http://localhost:8000"; // 여기에 서버 주소

const SearchBarPresenter: React.FC<SearchBarPresenterProps> = ({
  mode,
  onSearch,
}) => {
  const [hasSearched, setHasSearched] = useState(false);
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const cache = useRef<Record<string, LocationSuggestion[]>>({});

  // 자동완성용 API 호출
  useEffect(() => {
    if (mode !== "autocomplete") return;
    if ((inputText ?? "").trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      const keyword = inputText.trim();

      // 1. 캐시에 값이 있으면 바로 사용하고 return
      if (cache.current[keyword]) {
        setSuggestions(cache.current[keyword]);
        return;
      }

      // 2. 캐시에 없으면 API 요청
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      axios
        .get(`${BASE_URL}/api/locations`, {
          params: { keyword },
          signal: controller.signal,
        })
        .then((res) => {
          const result = res.data.content ?? [];
          setSuggestions(result);

          // 3. 캐시에 저장
          cache.current[keyword] = result;
        })
        .catch((err) => {
          if (err.name !== "CanceledError" && err.name !== "AbortError") {
            console.error(err);
          }
        });
    }, 700); // 디바운스 시간도 조금 늘려주면 더 안정적

    return () => clearTimeout(debounceTimeout);
  }, [inputText, mode]);

  // 검색 실행 (공통)
  const triggerSearch = (place_name: string) => {
    setHasSearched(true); // 검색 실행 시 상태 업데이트
    setInputText(place_name);

    setTravelPlan((prev) => {
      if (mode === "button") {
        return {
          ...prev,
          destination: place_name,
        };
      } else if (mode === "button4") {
        return {
          ...prev,
          companion: place_name,
        };
      } else if (mode === "button5") {
        return {
          ...prev,
          style: place_name,
        };
      }
      return prev;
    });

    if (onSearch) onSearch(place_name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (mode === "button" && e.key === "Enter") {
      triggerSearch(inputText);
    }
  };

  const handleSuggestionClick = (s: LocationSuggestion) => {
    setInputText(s.place_name);
    triggerSearch(s.place_name);
    setSuggestions([]);
  };
  return (
    <div className={styles.bodylayout}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={inputText ?? ""}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.input}
          placeholder="검색어를 입력하세요"
        />
        {mode === "button" && (
          <button
            onClick={() => triggerSearch(inputText)}
            className={styles.button}
          >
            장소추가
          </button>
        )}
        {mode === "button4" && (
          <button
            onClick={() => triggerSearch(inputText)}
            className={styles.button}
          >
            장소추가
          </button>
        )}
        {mode === "button5" && (
          <button
            onClick={() => triggerSearch(inputText)}
            className={styles.button}
          >
            장소추가
          </button>
        )}
      </div>

      {mode === "autocomplete" && (
        <>
          {Array.isArray(suggestions) && suggestions.length > 0 ? (
            <div className={styles.suggestionList}>
              <div className={styles.cardWrapper}>
                <CardView
                  cards={suggestions.map((s) => ({
                    placeName: s.place_name,
                    addressName: s.address_name,
                    categoryName: s.category_name,
                    onCardClick: () => handleSuggestionClick(s),
                  }))}
                />
              </div>
            </div>
          ) : (
            !hasSearched && (
              <div className={styles.noResult}>
                <div className={styles.suggestionList}>
                  <div className={styles.cardWrapper}>
                    <div className={styles.noResultMessage}>
                      검색 결과가 없습니다. 장소를 입력해 주세요.
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default SearchBarPresenter;
