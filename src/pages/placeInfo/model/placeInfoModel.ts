import { PlaceSSEEvent } from '../types/type';

export type PlaceSSEData = {
  type: "preview" | "detail" | "llm_result";
  data: PlaceSSEEvent;
};

export const fetchPlaceByKeyword = (
  keyword: string,
  onMessage: (data: PlaceSSEData) => void,
  onDone: () => void,
  onError: (err: Event) => void
) => {
  const source = new EventSource(
    `/api/place?keyword=${encodeURIComponent(keyword)}`
  );

  source.onmessage = (event) => {
    try {
      const parsed: PlaceSSEData = JSON.parse(event.data);
      onMessage(parsed);
      if (parsed.type === "llm_result") source.close();
    } catch (e) {
      console.error("파싱 오류", e);
    }
  };

  source.onerror = (err) => {
    onError(err);
    source.close();
  };
};
