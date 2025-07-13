// import AppLayout from "@/layout/AppLayout";
// import {
//   Box,
//   FileUpload,
//   GridItem,
//   Icon,
//   RatingGroup,
//   Textarea,
// } from "@chakra-ui/react";

// import {
//   BackGround,
//   Bottom,
//   FormContainer,
//   ScheduleList,
//   SubmitBtn,
//   SelectScheduleWrapper,
//   SidePadding,
//   ChooseSchedule,
// } from "./ReviewForm.style";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { LuUpload } from "react-icons/lu";
// import { useAccessToken } from "@/context/AccessTokenContext";
// import { scheduleCardMocks } from "@/mocks/reviews";
// import ScheduleCard from "./components/ScheduleCard";
// import {
//   createApiWithToken,
//   CustomAxiosRequestConfig,
// } from "@/api/axiosInstance";
// import { PaddingGraySm } from "@/components/common/padding/Padding";

// const ReviewForm = () => {
//   const onhandleSelect = (title) => setSelectedSchedule(title);
//   const [savedSchedules, setSavedSchedules] = useState([]);
//   const [selectedSchedule, setSelectedSchedule] = useState();
//   console.log(selectedSchedule);
//   const navigate = useNavigate();
//   const { accessToken, setAccessToken } = useAccessToken();
//   const api = createApiWithToken(() => accessToken, setAccessToken);
//   //보관한 일정 목록 조회
//   const fetchSavedSchedules = async () => {
//     const res = await api.get("/schedules", {
//       requiresAuth: true,
//     } as CustomAxiosRequestConfig);
//     const schedules = res.data;
//     return schedules;
//   };
//   useEffect(() => {
//     const load = async () => {
//       const data = await fetchSavedSchedules();
//       setSavedSchedules(data);
//       console.log(data)
//     };
//     load();
//   }, []);

//   // 리뷰 등록
//   const submitReview = async () => {
//     try {
//       const uploadedUrls = await uploadImages(imageFiles);
//       console.log("이미지들!!!!!!!!!", uploadedUrls);

//       const body = {
//         target_id: reviewData.schedule_id,
//         target_type: "SCHEDULE",
//         title: reviewData.title,
//         content: reviewData.content,
//         rating: reviewData.rating,
//         images: uploadedUrls,
//       };
//       console.dir(body);
//       const response = await api.post("/reviews", body, {
//         requiresAuth: true,
//       } as CustomAxiosRequestConfig);

//       console.log("리뷰 등록 성공:", response.data);
//       alert("리뷰가 등록되었습니다.");
//       navigate("/schdReviews");
//     } catch (error) {
//       console.error("리뷰 등록 실패:", error);
//       alert("리뷰 등록에 실패했습니다.");
//     }
//   };
//   // 상태 관리
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [reviewData, setReviewData] = useState({
//     title: "",
//     rating: 0,
//     content: "",
//     schedule_id: "",
//   });
//   //
//   // const { schedule_id } = useParams();

//   //이미지 업로드
//   const uploadImages = async (files: File[]): Promise<string[]> => {
//     const urls: string[] = [];
//     for (const file of files) {
//       const formData = new FormData();
//       console.log("업로드할 파일:", file);
//       formData.append("file", file);
//       const res = await api.post("/files/upload", formData, {
//         requiresAuth: true,
//       } as CustomAxiosRequestConfig);

//       urls.push(res.data);
//     }
//     console.log("업로드된 이미지 URL들:", urls);
//     return urls;
//   };

//   // useEffect(() => {
//   //   setReviewData((prev) => ({ ...prev, schedule_id: schedule_id }));
//   // }, [schedule_id]);
//   // const [setScheduleData] = useState(null);

//   // useEffect(() => {
//   //   const fetchScheduleData = async () => {
//   //     try {
//   //       const res = await fetch(`/schedules/${schedule_id}`);
//   //       if (!res.ok) throw new Error("일정 조회 실패");

//   //       const data = await res.json();
//   //       setScheduleData(data.schedule);
//   //     } catch (error) {
//   //       console.error("Error fetching schedule data:", error);
//   //     }
//   //   };

//   //   if (schedule_id) {
//   //     fetchScheduleData();
//   //   }
//   // }, [schedule_id]);

//   return (
//     <BackGround>
//       <AppLayout>
//         <GridItem colSpan={12}>
//           <Bottom>
//             <SubmitBtn onClick={submitReview}>등록하기</SubmitBtn>
//           </Bottom>

//           <FormContainer>
//             <SelectScheduleWrapper>
//               <ChooseSchedule>리뷰를 작성할 일정을 골라주세요</ChooseSchedule>
//               <ScheduleList>
//                 {scheduleCardMocks.map((i) => (
//                   <ScheduleCard
//                     id={i.id}
//                     key={i.id}
//                     onhandleSelect={() => onhandleSelect(i.title)}
//                     imgUrl={i.imgUrl}
//                     title={i.title}
//                     destination={i.destination}
//                     duration={i.duration}
//                     companion={i.companion}
//                   ></ScheduleCard>
//                 ))}
//               </ScheduleList>
//             </SelectScheduleWrapper>
//             <PaddingGraySm />
//             <SidePadding>
//               <p>{selectedSchedule}</p>
//               <input
//                 type="text"
//                 value={reviewData.title}
//                 onChange={(e) => {
//                   setReviewData({ ...reviewData, title: e.target.value });
//                 }}
//                 placeholder="제목을 입력하세요"
//               />

//               {/* 일정 미리보기*/}
//               {/* <SchedulePreview scheduleData={scheduleData}></SchedulePreview> */}
//               {/* 파일 업로드 */}
//               <FileUpload.Root
//                 maxW="xl"
//                 alignItems="stretch"
//                 maxFiles={10}
//                 onFileChange={(details) => {
//                   console.log(details);
//                   const acceptedFiles = details.acceptedFiles;
//                   console.log(acceptedFiles);
//                   setImageFiles(acceptedFiles);
//                 }}
//               >
//                 <FileUpload.HiddenInput />
//                 <FileUpload.Dropzone>
//                   <Icon size="md" color="fg.muted">
//                     <LuUpload />
//                   </Icon>
//                   <FileUpload.DropzoneContent>
//                     <Box>사진을 첨부하세요</Box>
//                     <Box color="fg.muted">
//                       여행에서의 즐거운 순간들을 남겨보아요.
//                     </Box>
//                   </FileUpload.DropzoneContent>
//                 </FileUpload.Dropzone>
//                 <FileUpload.List />
//               </FileUpload.Root>
//               {/* 별점 */}
//               <RatingGroup.Root
//                 value={reviewData.rating}
//                 onValueChange={(e) => {
//                   setReviewData({ ...reviewData, rating: e.value });
//                   console.log(e.value);
//                 }}
//                 count={5}
//                 defaultValue={0}
//                 size="lg"
//                 pl="3rem"
//                 pr="3rem"
//               >
//                 <RatingGroup.HiddenInput />
//                 <RatingGroup.Control />
//               </RatingGroup.Root>
//               <Textarea
//                 autoresize
//                 onChange={(e) => {
//                   setReviewData({ ...reviewData, content: e.target.value });
//                   console.log(reviewData.content);
//                 }}
//                 value={reviewData.content}
//                 placeholder="여행 어떠셨나요? 리뷰를 작성해주세요."
//               />
//             </SidePadding>
//           </FormContainer>
//         </GridItem>
//       </AppLayout>
//     </BackGround>
//   );
// };

// export default ReviewForm;
