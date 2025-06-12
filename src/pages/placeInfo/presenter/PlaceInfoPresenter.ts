import { useState } from "react";
import { fetchPlaceByKeyword } from "../model/placeInfoModel";

export const usePlaceSearch = () => {
  const [preview, setPreview] = useState(null);
  const [detail, setDetail] = useState(null);
  const [llmResult, setLLMResult] = useState(null);
  const [loading, setLoading] = useState(false);
//키워드로 장소를 받아오는 함수
  const searchPlace = (keyword: string) => {
    setLoading(true);

    fetchPlaceByKeyword(
      keyword,
      (event) => {
        switch (event.type) {
          case "preview":
            setPreview(event.data);
            break;
          case "detail":
            setDetail(event.data);
            break;
          case "llm_result":
            setLLMResult(event.data);
            setLoading(false);
            break;
        }
      },
      () => setLoading(false),
      (err) => {
        console.error("SSE 오류", err);
        setLoading(false);
      }
    );
  };

  return {
    preview,
    detail,
    llmResult,
    loading,
    searchPlace,
  };
};
