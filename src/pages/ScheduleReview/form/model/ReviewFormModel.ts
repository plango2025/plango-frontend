// ReviewFormModel.ts
export const fetchSchedules = async ({pageParam=null},  api) => {
  const res = await api.get("/users/schedules", {
    params: { cursor: pageParam },
    requiresAuth: true,
  });
  return res.data; // { items, next_cursor, has_more }
};
//더미일정만들기
export const createDummySchedule = async (api) => {
  const response = await api.post("/schedules/dummy", {}, {
    requiresAuth: true,
  } );
  return response.data;
};
export const uploadImages = async (api, files: File[]) => {
  const urls: string[] = [];
console.dir(files);

  for (const file of files) {
    const formData = new FormData();
    formData.append("files", file); // 단일 파일
    const res = await api.post("/files", formData, {
      responseType: "text",
      requiresAuth: true,
      withCredentials: true,
    });
    const parsed = JSON.parse(res.data);
    console.dir(parsed);
    urls.push(...parsed.file_urls); // 서버는 단일 URL 반환
  }

  return urls;
};

interface PostReviewBody {
  type: "PLACE" | "SCHEDULE";
  title?: string;
  content: string;
  rating: number;
  file_urls?: string[];
  reference_id?: string; // 일정 리뷰일 경우 필수
  keyword?: string; // 장소 리뷰일 경우 필수
}

export const postReview = async (api, body: PostReviewBody) => {
  // body 검증 (선택적, 디버깅용)
  console.log("모야 왜 안옴!!!!!")
  console.log("POST /reviews body:", body);
  console.dir(api);
  // 타입별 필수 필드 체크
  if (body.type === "SCHEDULE" && !body.reference_id) {
    throw new Error("SCHEDULE 리뷰에는 reference_id가 필요합니다.");
  }

  if (body.type === "PLACE" && !body.keyword) {
    throw new Error("PLACE 리뷰에는 keyword(장소이름)가 필요합니다.");
  }

  return api.post("/reviews", body, { requiresAuth: true });
};