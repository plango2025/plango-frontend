// // 일정 리뷰 상세 페이지지
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import CommentList from "./components/CommentList";
// import AppLayout from "@/layout/AppLayout";
// import {
//   Avatar,
//   GridItem,
//   Heading,
//   Separator,
//   Text
// } from "@chakra-ui/react";
// import { Header, IconBox, Image, Wrapper } from "./view/ReviewDetailPage.style";

// import { FaHeart, FaRegBookmark, FaRegCommentDots } from "react-icons/fa";
// import { Rating } from "../../../components/Card.style";
// import { getStarsIcons } from "../../../components/Card";
// import { Profile } from './view/ReviewDetailPage.style';
// import { Gallery } from './view/ReviewDetailPage.style';
// //일정 리뷰 상세 정보
// interface Review {
//   review_id: number;
//   target_id: string,
//   user_id: string;
//   title: string;
//   content: string;
//   rating: number;
//   images:string[],
//   created_at: string,
//   updated_at:string,

// }
// //일정 리뷰에 대한 댓글
// interface Comment {
//   comment_id: number;
//   target_id:number; //이건 리뷰id
// target_type: string; //SCHEDULE_REVIEW
//   user_id: string; 
//     content: string;
// user_nickname:string;
// user_avatar: string;
//   created_at: string;
//   updated_at: string;
// }
// interface User {
//   id: string,
//   nickname: string;
//   profile_image: string;
//   adress:string,
//   birth:string,
//   trip_count:number,
  
// }

// const ReviewDetailPage = () => {
//   const { id } = useParams();
//   const [review, setReview] = useState<Review | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [user, setUser] = useState<User | null>(null);
//   const [likeCount, setLikeCount] = useState<number>(0);
//   useEffect(() => {
//     if (!review) return;

//     fetch(
//       `/api/likes/count?target_id=${review.review_id}&target_type=SCHEDULE_REVIEW`
//     )
//       .then((res) => {
//         if (!res.ok) throw new Error("좋아요 수 불러오기 실패");
//         return res.json();
//       })
//       .then((data) => {
//         setLikeCount(data.like_count ?? 0);
//       })
//       .catch((err) => console.error(err));
//   }, [review]);
//   // 1. 리뷰 + 작성자 정보 가져오기
//   useEffect(() => {
//     fetch(`/api/reviews/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("리뷰 데이터를 불러오는 데 실패했습니다.");
//         return res.json();
//       })
//       .then((data) => {
//         setReview(data);
//         return fetch(`/api/users/${data.user_id}`);
//       })
//       .then((res) => {
//         if (!res.ok)
//           throw new Error("작성자 데이터를 불러오는 데 실패했습니다.");
//         return res.json();
//       })
//       .then((userData) => setUser(userData))
//       .catch((err) => console.error(err));
//   }, [id]);

//   // 2. 댓글 + 댓글 작성자 정보 병합
//   useEffect(() => {
//     if (!review) return;

//     fetch(
//       `/api/comments?targetId=${review.review_id}&targetType=SCHEDULE_REVIEW`
//     )
//       .then((res) => res.json())
//       .then(async (commentData) => {
//         const userIds = [...new Set(commentData.map((c) => c.user_id))];

//         const userResponses = await Promise.all(
//           userIds.map((uid) =>
//             fetch(`/api/users/${uid}`)
//               .then((res) => (res.ok ? res.json() : null))
//               .catch(() => null)
//           )
//         );

//         const userMap = Object.fromEntries(
//           userResponses.filter((u) => u !== null).map((u) => [u.id, u])
//         );

//         const enrichedComments = commentData.map((comment) => ({
//           comment_id: comment.comment_id,
//           target_id: review.review_id,
//           target_type: "SCHEDULE_REVIEW",
//           content: comment.content,
//           user_id: comment.user_id,
//           user_nickname: userMap[comment.user_id]?.nickname ?? "알 수 없음",
//           user_avatar: userMap[comment.user_id]?.profile_image ?? "",
//           created_at: comment.created_at,
//         }));

//         setComments(enrichedComments);
//       })
//       .catch((err) =>
//         console.error("댓글 또는 사용자 정보 불러오기 실패:", err)
//       );
//   }, [review]); 

//   //   Promise.all([
//   //     fetch(``).then((res) =>
//   //       res.json()
//   //     ),
//   //     fetch(`${mockbaseUrl}/users`).then((res) => res.json()),
//   //   ])
//   //     .then(([commentData, userData]) => {
//   //       const enrichedComments = commentData.map((comment) => {
//   //         const matchedUser = userData.find((u) => u.id === comment.userId);
//   //         return {
//   //           ...comment,
//   //           userName: matchedUser?.nickname || "알 수 없음",
//   //           userAvatar: matchedUser?.profile_image || "",
//   //         };
//   //       });
//   //       setComments(enrichedComments);
//   //     })
//   //     .catch((err) =>
//   //       console.error("댓글 또는 사용자 데이터 불러오기 실패:", err)
//   //     );
//   // }, [id]);

//   if (!review || !user) return <div>로딩 중...</div>;

//   return (
//     <>
//       <AppLayout>
//         <GridItem colSpan={12}>
//           {/* 여러개 이미지 받았을때 처리하는 코드 만들기기 */}
//           <Header backgroundUrl={review.images[0] ?? null}>
//             {/* 제목 */}
//             <Heading zIndex={"1"} fontSize="3rem">
//               {review.title}
//             </Heading>
//             {/* 작성자 프로필 */}
//             <Profile>
//               <Avatar.Root size={"sm"}>
//                 <Avatar.Fallback name={user.nickname} />
//                 <Avatar.Image src={user.profile_image || null} />
//               </Avatar.Root>
//               <p>{user.nickname}</p>
//             </Profile>

//             {/* 별점 */}
//             <Rating>
//               {getStarsIcons(review.rating)}
//               <span style={{ color: "white" }}>{review.rating}</span>
//             </Rating>
//           </Header>
//           <Wrapper>
//             {/* 갤러리 */}
//             <Gallery>
//               {review.images.map((image) => (
//                 <Image src={image}></Image>
//               ))}
//             </Gallery>
//             {/* 일정 리뷰 본문 */}
//             <Text
//               whiteSpace="pre-line"
//               p={"1rem 2rem"}
//               fontSize={"1.2rem"}
//               // textAlign="center"
//               lineHeight="3rem"
//             >
//               {review.content}
//             </Text>
//             {/* 좋아요 , 스크랩, 댓글 */}
//             <IconBox>
//               <span>
//                 <FaHeart /> {likeCount}
//               </span>
//               {/* <span>
//                 <FaRegBookmark /> {review.bookmarks}
//               </span>
//               <span>
//                 <FaRegCommentDots /> {review.comments}
//               </span> */}
//             </IconBox>
//             <Separator mt="3rem" mb="3rem" size={"lg"} />
//             {/* 댓글 */}
//             <input type="text" placeholder="댓글을 입력하세요" />
//             <CommentList comments={comments} />
//           </Wrapper>
//         </GridItem>
//       </AppLayout>
//     </>
//   );
// };

// export default ReviewDetailPage;
