// import { PlaceSSEEvent } from "../types/type";

// export type PlaceSSEData = {
//   type: "preview" | "detail" | "llm_input";
//   data: PlaceSSEEvent;
// };

// export const fetchPlaceByKeyword = (
//   keyword: string,
//   onMessage: (data: PlaceSSEData) => void,
//   onDone: () => void,
//   onError: (err: Event) => void
// ) => {
//   const source = new EventSource(
//     `http://localhost:8080/api/place?keyword=${encodeURIComponent(keyword)}`
//   );
//   source.onmessage = (event) => {
//     try {
//       const parsed: PlaceSSEData = JSON.parse(event.data);
//       onMessage(parsed);
//       if (parsed.type === "llm_input") source.close();
//       onDone()
//     } catch (e) {
//       console.error("파싱 오류", e);
//     }
//   };

//   source.onerror = (err) => {
//     console.error("SSE 연결 오류:", err);
//     onError(err);
//     source.close();
//   };
// };
export const fetchPlaceByKeyword=async(api, keyword:string)=>{

  const res = await api.get("/places", {
    params: { keyword },
    requiresAuth: false,
  });
  console.log(res.data);
  return res.data;
}