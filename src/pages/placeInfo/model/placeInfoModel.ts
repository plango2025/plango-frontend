export const fetchPlaceByKeyword=async(api, keyword:string)=>{
  const res = await api.get("/places", {
    params: { keyword },
    requiresAuth: false,
  });
  return res.data;
}

export const fetchPlaceReviews = async (
  api,
  {
    keyword,
    limit = 10,
    cursor,
  }: { keyword: string; limit?: number; cursor?: string | null }
) => {
  // baseURL이 '/api'가 아니라면 경로를 '/api/reviews'로 바꿔주세요.
  const res = await api.get("places/reviews", {
    params: { keyword, limit, cursor },
    // is_liked, is_scrapped 위해 토큰 포함
    requiresAuth: true,
  });
  console.log("장소 리뷰 불러오기:", res.data);
  return res.data
};