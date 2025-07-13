// // ReviewTestPage.tsx
// import React, { useEffect, useState } from "react";
// import { createApiWithToken } from "@/api/axiosInstance"; // ← 너가 올려준 커스텀 axios
// import { useAccessToken } from "@/context/AccessTokenContext"; // 예: 토큰 상태 관리 컨텍스트

// const ReviewTestPage = () => {
//   const [reviews, setReviews] = useState([]);
//   const { accessToken, setAccessToken } = useAccessToken(); // ✅ useContext로부터 토큰 받기
//   const api = createApiWithToken(() => accessToken, setAccessToken); // ✅ 커스텀 axios 생성

//   // 🔍 GET /api/reviews?targetType=SCHEDULE 호출
//   const fetchScheduleReviews = async () => {
//     try {
//       const res = await api.get("/reviews?targetType=SCHEDULE", {
//         requiresAuth: true, // ✅ 토큰 자동 첨부 트리거
//     });
//       console.log("리뷰 응답:", res.data);
//       setReviews(res.data.data);
//     } catch (err) {
//       console.error("리뷰 조회 실패:", err);
//     }
//   };

//   useEffect(() => {
//     fetchScheduleReviews();
//   }, []);

//   return (
//     <div>
//       <h2>스케줄 리뷰 목록</h2>
//       <ul>
//         {reviews.map((review: any) => (
//           <li key={review.id}>
//             <strong>{review.title}</strong> - 평점: {review.rating}
//             <br />
//             {review.content}
//             <br />
//             {review.images?.map((url: string, idx: number) => (
//               <img key={idx} src={url} alt="리뷰 이미지" width={100} />
//             ))}
//             <hr/>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReviewTestPage;
