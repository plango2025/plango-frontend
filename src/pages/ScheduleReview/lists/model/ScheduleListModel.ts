export const fetchReviews = async (api, searchKeyword = "", pageParam=0,isLoggedIn) => {
  const params: Record<string, string|number> = {
    targetType: "SCHEDULE",
    page:pageParam
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
