import React, { useState, useEffect, useRef } from "react";
import styles from "./CommonSearchbar.module.scss";
import { useTravelPlan } from "@/pages/ScheduleCreationPage/scheduleCreationFeatures/Stepper/StepperPages/StepPageContext";
import { LocationSuggestion } from "./locationsuggestion";
import axios from "axios";
import CardView from "@/pages/ScheduleCreationPage/scheduleCreationFeatures/components/card/CardView"; // CardView 컴포넌트 임포트"
type SearchBarMode = "button" | "autocomplete";

type SearchBarPresenterProps = {
  mode: SearchBarMode;
  onSearch?: (text: string) => void;
};

const BASE_URL = "http://localhost:8080"; // 여기에 서버 주소

const SearchBarPresenter: React.FC<SearchBarPresenterProps> = ({
  mode,
  onSearch,
}) => {
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 자동완성용 API 호출
  useEffect(() => {
    if (mode !== "autocomplete") return;
    if (inputText.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      axios
        .get(`${BASE_URL}/api/locations`, {
          params: { keyword: inputText },
          signal: controller.signal,
        })
        .then((res) => {
          console.log("API 응답 content:", res.data.content);
          setSuggestions(res.data.content ?? []);
        })
        .catch((err) => {
          if (err.name !== "CanceledError" && err.name !== "AbortError") {
            console.error(err);
          }
        });
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [inputText, mode]);

  // 검색 실행 (공통)
  const triggerSearch = (placeName: string) => {
    console.log("triggerSearch 호출, placeName:", placeName); // 로그 추가
    setInputText(placeName);
    setTravelPlan((prev) => ({
      ...prev,
      destination: placeName,
    }));
    if (onSearch) onSearch(placeName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (mode === "button" && e.key === "Enter") {
      triggerSearch(inputText);
    }
  };

  const handleSuggestionClick = (s: LocationSuggestion) => {
    console.log("handleSuggestionClick 호출:", s.placeName);
    setInputText(s.placeName);
    triggerSearch(s.placeName);
    setSuggestions([]);
  };
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={inputText}
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
          검색
        </button>
      )}

      {mode === "autocomplete" &&
        Array.isArray(suggestions) &&
        suggestions.length > 0 && (
          <ul className={styles.suggestionList}>
            {suggestions.map((s) => (
              <li
                key={s.id}
                onClick={() => handleSuggestionClick(s)}
                className={styles.suggestionItem}
              >
                {s.placeName}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default SearchBarPresenter;
