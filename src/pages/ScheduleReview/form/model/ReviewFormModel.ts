// ReviewFormModel.ts

import { CustomAxiosRequestConfig } from "@/api/axiosInstance";


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
  } as CustomAxiosRequestConfig);
  return response.data;
};
export const uploadImages = async (api, files: File[],renameFile ) => {
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

export const postReview = async (api, body) => {
  console.dir(body)
  return api.post("/reviews", body, { requiresAuth: true });
};
