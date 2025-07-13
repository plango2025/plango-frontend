// import Header from "./components/Header";
// import AppLayout from "@/layout/AppLayout";
// import Card from "@/components/Card";
// import { ButtonContainer } from "./ScheduleList.style";
// import { useNavigate } from "react-router-dom";
// import {  GridItem } from "@chakra-ui/react";
// import { Wrapper } from "./ScheduleList.style";
// import { useEffect, useState } from "react";
// import { useAccessToken } from '@/context/AccessTokenContext';
// import { createApiWithToken, CustomAxiosRequestConfig } from '@/api/axiosInstance';

// const ScheduleLists = () => {
//    const { accessToken, setAccessToken } = useAccessToken();
//     const api = createApiWithToken(accessToken, setAccessToken);
//   const [keyword, setKeyword] = useState("");
//   const [schdReviews, setScheduleReviews] = useState([]);
//   const navigate = useNavigate();
 
//   const fetchReviews = async (searchKeyword = "") => {
//     try {
//       const baseUrl = `/api/reviews?targetType=SCHEDULE`;
//       const fullUrl = searchKeyword
//         ? `${baseUrl}&keyword=${encodeURIComponent(searchKeyword)}`
//         : baseUrl;

//       const response = await fetch(fullUrl);
//       if (!response.ok) throw new Error("리뷰를 불러올 수 없습니다");
//       const data = await response.json();
//       setScheduleReviews(data);
//     } catch (error) {
//       console.error("API 호출 오류", error);
//     }
//   };
  
//   const handleSearch = () => {
//     fetchReviews(keyword);
//   };
  
//   useEffect(() => {
//     fetchReviews();
//     ;
//   }, []);
//   return (
//     <Wrapper>
//       <AppLayout>
//         {/* GridItem은 AppLayout 내부에서만 사용 */}
//         <GridItem colSpan={12}>
//           <ButtonContainer>
//             <button
//               onClick={() => navigate("/schdReview/new")}
//               className="add-button"
//             >
//               리뷰 작성하기
//             </button>
//             {/* 임시시 */}
//             <button
//               onClick={async () => {
//                 try {
//                   const response = await api.post(
//                     "/schedules/dummy-create",
//                     {
//                       requiresAuth: false,
//                     } as CustomAxiosRequestConfig
//                   );
//                   console.log(response)
                 
//                 } catch (error) {
//                   console.error("API 호출 에러:", error);
//                   alert("에러가 발생했습니다.");
//                 }
//               }}
//             >
//               임시 리뷰들들
//             </button>
//             {/* 임시시 */}
//             <button
//               onClick={() => {
//                 navigate("/login");
//               }}
//               className="login-button"
//             >
//               로그인
//             </button>
//           </ButtonContainer>
//         </GridItem>

//         <GridItem colSpan={12}>
//           <Header
//             onSearch={handleSearch}
//             keyword={keyword}
//             setKeyword={setKeyword}
//           />
//         </GridItem>

//         {schdReviews.map((review) => (
//           <GridItem key={review.review_id} colSpan={3}>
//             <Card key={review.review_id} review={review} />
//           </GridItem>
//         ))}
//       </AppLayout>
//     </Wrapper>
//   );
// };

// export default ScheduleLists;
