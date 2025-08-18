// model/ScheduleListModel.ts
import { CustomAxiosRequestConfig } from "@/api/axiosInstance";

export const fetchReviews = async (api, searchKeyword = "") => {
  const params: Record<string, string> = {
    targetType: "SCHEDULE",
  };

  if (searchKeyword) {
    params.keyword = searchKeyword;
  }

  const response = await api.get("/reviews", {
    params,
    requiresAuth: false,
  });
console.log("fetchReviews response:", response.data);
  return response.data;
};


export const createDummySchedule = async (api: any) => {
  return api.post("/schedules/dummy-create", {}, {
    requiresAuth: false,
  } as CustomAxiosRequestConfig);
};
