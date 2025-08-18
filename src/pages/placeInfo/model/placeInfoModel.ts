export const fetchPlaceByKeyword=async(api, keyword:string)=>{
  const res = await api.get("/places", {
    params: { keyword },
    requiresAuth: false,
  });
  console.log(res.data);
  return res.data;
}