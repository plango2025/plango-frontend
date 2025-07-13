// ReviewFormModel.ts
export const fetchSavedSchedules = async (api) => {
  const res = await api.get("/schedules", { requiresAuth: true });
  console.log(res.data)
  return res.data;
};

export const uploadImages = async (api, files: File[]) => {
  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("files", file); // 단일 파일

    const res = await api.post("/files", formData, {
      responseType: "text",
      requiresAuth: true,
      withCredentials: true,
    });
    console.dir(res.data);
    urls.push(res.data); // 서버는 단일 URL 반환
  }
console.log(urls)
  return urls;
};


export const postReview = async (api, body) => {
  console.log(body)
  return api.post("/reviews", body, { requiresAuth: true });
};
