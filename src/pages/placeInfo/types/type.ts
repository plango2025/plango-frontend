export interface PlacePreview {
  type: "preview";
  data: {
    contentid: number;
    keyword_search_info: {
      title: string;
      addr1: string;
      mapx: string;
      mapy: string;
    };
  };
}

export interface PlaceDetail {
  type: "detail";
  data: {
    contentid: number;
    common_info: { title: string; homepage: string };
    images: { originimgurl: string }[];
    intro_info: { usetime: string; restdate: string; infocenter: string };
  };
}

export interface LLMResult {
  type: "llm_input";
  data: {
    one_line_summary: string;
    summary: string;
    keywords: string[];
    checklist: { question: string; answer: string }[];
  };
}

export type PlaceSSEEvent = PlacePreview | PlaceDetail | LLMResult;
