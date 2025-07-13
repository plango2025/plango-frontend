// Preview 구조
export interface PlacePreview {
  type: "preview";
  data: {
    contentid: number;
    contenttypeid: number;
    keyword_search_info: PlacePreviewKeywordSearchInfo;
  };
}


export interface PlacePreviewKeywordSearchInfo {
  addr1: string;
  addr2: string;
  contentid: number;
  contenttypeid: number;
  title: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  firstimage: string;
  tel: string;
}

// Detail 구조
export interface PlaceDetail {
  type: "detail";
  data: {
    contentid: number;
    contenttypeid: number;
    common_info: PlaceCommonInfo;
    images: PlaceImage[];
    intro_info: PlaceIntroInfo;
    repeat_info: PlaceRepeatInfo;
  };
}
//기본 정보 (프리뷰와 중복되므로 사용안함)
export interface PlaceCommonInfo {
  contentid: number;
  contenttypeid: number;
  title: string;
  homepage: string; // HTML string
  booktour: string;
}

export interface PlaceImage {
  contentid: number;
  imgname: string;
  originimgurl: string;
  serialnum: string;
}

export interface PlaceIntroInfo {
  contentid: number;
  contenttypeid: number;
  accomcount: string;
  chkbabycarriage: string;
  chkcreditcard: string;
  chkpet: string;
  expagerange: string;
  expguide: string;
  heritage1: string;
  heritage2: string;
  heritage3: string;
  infocenter: string;
  opendate: string;
  parking: string;
  restdate: string; // HTML string
  useseason: string;
  usetime: string; // HTML string
}

export interface PlaceRepeatInfo {
  contentid: number;
  contenttypeid: number;
  fldgubun: string;
  infoname: string;
  infotext: string; // HTML string
  serialnum: string;
}
export interface LLMResult {
  type: "llm_input";
  data: {
    one_line_summary: string;
    summary: string;
    keywords: string[];
    style: string;
    checklist: {
      question: string;
      answer: string;
    }[];
  };
}