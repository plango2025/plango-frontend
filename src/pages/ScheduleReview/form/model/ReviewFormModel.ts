// ReviewFormModel.ts

import { CustomAxiosRequestConfig } from "@/api/axiosInstance";

// {
//   "schedules": [
//     {
//       "schedule_id": "abc123",
//       "title": "부산 여행",
//       "destination": "부산",
//       "duration": "2일",
//       "created_at": "2025-07-13",
//       "thumbnail_url": "https://some-image-url.jpg"
//     },
//     ...
//   ]
// }
export const fetchSavedSchedules = async (api) => {
  const res = await api.get("/schedules", { requiresAuth: true });
  return res.data.schedules;
};
//더미일정만들기
export const createDummySchedule = async (api) => {
  const response = await api.post("/schedules/dummy", {}, {
    requiresAuth: true,
  } as CustomAxiosRequestConfig);
  return response.data;
};
export const uploadImages = async (api, files: File[],renameFile ) => {
  const urls: string[] = [];
console.dir(files);

  for (const file of files) {
    const formData = new FormData();
    formData.append("files", file); // 단일 파일
    console.dir("폼 데이터", formData);
    const res = await api.post("/files", formData, {
      responseType: "text",
      requiresAuth: true,
      withCredentials: true,
    });
    console.dir(res.data);
    const parsed = JSON.parse(res.data);

    urls.push(...parsed.file_urls); // 서버는 단일 URL 반환
  }

  return urls;
};

export const postReview = async (api, body) => {
  console.dir(body)
  return api.post("/reviews", body, { requiresAuth: true });
};
