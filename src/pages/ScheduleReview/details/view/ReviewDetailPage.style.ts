import styled from "styled-components";

export const ReviewLink= styled.p`
color:red
`
export const Header = styled.div<{ bgUrl?: string }>`
  max-width: 100%;
  position: relative;
  padding: 15rem 3rem 5rem 3rem;
  max-height: 30rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${({ bgUrl }) =>
    bgUrl
      ? `
        background-image: url(${encodeURI(bgUrl)});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `
      : `
        background-color: white;
      `}

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 0;
  }
`;
export const Title = styled.div`
  width: 100%;
  font-size: 3rem;
  line-height: 3.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const Wrapper = styled.div`
  padding-bottom: 3rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Gallery = styled.div`
  display: flex; /* ✅ 가로 정렬 */
  overflow-x: auto; /* ✅ 가로 스크롤 허용 */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem 0;

  /* 스크롤바 숨기기 (선택사항) */
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const GalleryImage = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 1rem;
  font-size: 1.2rem;
  z-index: 1;
`;
export const IconBox = styled.div`
width: 100%;

  display: flex;
  justify-content:flex-start;
  gap: 0.6rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #444;
  margin-top: 1.5rem;
`;
export const Icon = styled.div`
width: 5rem;
padding:0.3rem 0.1rem;

display: flex;
align-items: center;
gap:0.4rem;
span{

}
`
export const CommentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const InputWrap = styled.div`
  border-radius: 40px;

  
  bottom: 0;
  width: 100%;
  display: flex;
  background-color: #edededff;

  justify-content: space-between;
  /* border:1px solid #d6d6d6ff; */
`;
export const CommentInput = styled.input`
  width: 100%;
  background-color: #edededff;

  height: 3rem;
  padding: 2rem;
  border-radius: 40px 0 0 40px;
  font-size: 18px;
  outline: none;
`;
export const CommentSubmitBtn = styled.button`
width:7rem;
font-size: 18px;
  border-radius: 40px ;
  background-color:#15BDB1;
  color:white;
  :focus{
      background-color:#109A90

  }
`;

export const MenuIcon = styled.div`
  position: absolute;
  font-size: 2rem;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  cursor: pointer;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;
