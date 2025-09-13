export const fetchReviews = async (api, searchKeyword = "", isLoggedIn) => {
  const params: Record<string, string> = {
    targetType: "SCHEDULE",
  };

  if (searchKeyword) {
    params.keyword = searchKeyword;
  }
  console.log("🤗🤗🤗isLoggedIn:", isLoggedIn);
  const response = await api.get("/reviews", {
    params,
    requiresAuth: isLoggedIn,
  });
  console.log("fetchReviews response:", response.data);
  return response.data;
};



export const createDummySchedule = async (api: any) => {
  return api.post("/schedules/dummy-create", {}, {
    requiresAuth: false,
  } );
};
