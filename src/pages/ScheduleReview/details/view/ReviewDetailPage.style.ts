import styled from 'styled-components';
interface HeaderProps {
  backgroundUrl: string;
}
export const Wrapper= styled.div`

padding-bottom: 3rem;
margin: 0 auto;     
max-width: 1200px;
display: flex;
flex-direction: column;
gap: 3rem;`;


export const Header = styled.div<HeaderProps>`
  max-width: 100vw;
  position: relative;
  padding: 15rem 3rem 5rem 3rem;
  padding-top: 15rem;

  color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${(props) =>
    props.backgroundUrl
      ? `
        background-image: url(${props.backgroundUrl});
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

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  margin: 1rem 2rem;

 
`;
export const Image = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


export const Profile= styled.div`
display: flex;
align-items: center;
gap: 1rem;
margin-right: 1rem;
font-size: 1.2rem;
z-index: 1;
` 
export const IconBox = styled.div`

display: flex;
  justify-content: center;
  gap: 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #444;
  margin-top: 1.5rem;
`
export const CommentSubmitBtn = styled.button`
`