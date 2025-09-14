import { Box, RatingGroup, Separator } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Padding1 } from "@/components/common/padding/padding";

const Gallery = styled.div`
height: 200px;
  width: 100%;
  height: 15rem;
  display: flex;
  gap: 4px;
`;
const Thumbnail = styled.img`
  width: 50%;
  height: 100%%;
  object-fit: cover;
  border-radius: 8px;
`;
const SmallImgContainer = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
`;
const SmallImg = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const EmptyBox = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: #f3f3f3; /* 연한 회색 */
`;
type Item = {
  id: string;
  author: { nickname: string; profile_image?: string };
  rating: number;
  like_count: number;
  comment_count: number;
  file_urls?: string[];
  content: string;
  created_at: string
};

const PlaceReview = ({
  title,
  items = [],
  hasMore,
  onLoadMore,
}: {
  title?: string;
  items: Item[];
  hasMore?: boolean;
  onLoadMore?: () => void;
}) => {
  const navigate = useNavigate();

  const handleWriteBtnClick = () => {
    // 리뷰 작성 페이지로 이동
    navigate(`/reviews/new/PLACE/${title}`);
  };
  return (
    <Wrap>
      <Head>
        <h3>
          장소 리뷰 <Count>{items.length.toLocaleString()}</Count>
        </h3>
        <WriteBtn onClick={handleWriteBtnClick}>리뷰 작성하러 가기</WriteBtn>
      </Head>

      <Grid>
        {items.map((it) => (
          <Card key={it.id}>
            <Separator  />
            <Padding1 />
            <CardTop>
              <User>
                <Avatar src={it.author.profile_image} />
                <div>
                  <Nick>{it.author.nickname}</Nick>
                  <Box display="flex" alignItems={"center"} gap="0.5rem">
                    <Rating>
                      <RatingGroup.Root
                        size={"xs"}
                        colorPalette={"yellow"}
                        value={it.rating}
                        count={5}
                        readOnly
                      >
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control />
                      </RatingGroup.Root>
                    </Rating>
                    <p>{it.rating}</p>
                  </Box>
                  <DateText>{it.created_at}</DateText>
                </div>
              </User>

              {/* 본문이 길면 detail 버튼 표시 */}
              <button
                type="button"
                aria-label="리뷰 상세 보기"
                onClick={() => navigate(`/reviews/${it.id}`)}
              >
                <MdOutlineNavigateNext size={28} />
              </button>
            </CardTop>
            {/* 파일 썸네일이 있으면 보여주기 */}
            {it.file_urls && it.file_urls.length > 0 && (
              <>
                <Gallery
                 
                 
                >
                  <Thumbnail src={it.file_urls[0]} />
                  <SmallImgContainer>
                    {Array.from({ length: 4 }).map((_, index) => {
                      const url = it.file_urls?.[index + 1]; // 0번은 썸네일이라 +1
                      return url ? (
                        <SmallImg
                          key={index}
                          src={url}
                          alt={`첨부 이미지 ${index + 1}`}
                        />
                      ) : (
                        <EmptyBox key={index} /> // 빈 슬롯
                      );
                    })}
                  </SmallImgContainer>
                </Gallery>
              </>
            )}
            <Padding1 />
            <Body>{it.content}</Body>
            <Padding1 />

            {/* <Foot>
              <FaHeart/>  <span>{it.like_count}</span>
              <span><FaBookmark/> {it.comment_count}</span>
            </Foot> */}
          </Card>
        ))}
      </Grid>

      {hasMore && (
        <MoreBtn type="button" onClick={onLoadMore}>
          더 보기
        </MoreBtn>
      )}
    </Wrap>
  );
};

export default PlaceReview;

/* styled */
const Wrap = styled.div`
  width: 100%;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  h3 {
    font-weight: 700;
    font-size: 18px;
  }
`;
const Count = styled.span`
  color: #007aff;
  margin-left: 4px;
`;
const WriteBtn = styled.button`
  background: #15bdb1;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s ease; /* ← 추가: 0.3초 동안 배경색 부드럽게 전환 */

  &:hover {
    background: #109a90;
  }
`;
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Card = styled.div`
  border-radius: 12px;
  padding: 12px;
`;
const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const User = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ddd;
  object-fit: cover;
`;
const Nick = styled.div`
  font-weight: 600;
`;
const Rating = styled.div`
  font-size: 12px;
  color: #666;
`;
const DateText = styled.div`
  font-size: 10px;
  color: #999;
`;

const Body = styled.p`
  font-size: 14px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 몇 줄까지 보여줄지 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 34px;
`;

const MoreBtn = styled.button`
  margin: 16px auto 0;
  display: block;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 24px;
`;
