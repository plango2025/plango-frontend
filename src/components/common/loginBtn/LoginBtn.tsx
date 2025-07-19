import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
export const Btn = styled.button`

 width: 8rem;
    height: 2.5rem;
    border-radius: 40px;
    font-size: 1rem;
    cursor: pointer;
 background-color: #15bdb1; /* Green */
    color: white;
    border: none;
      :hover{background-color: #109a90;
      }`
function LoginBtn() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
   
      <Btn onClick={handleLoginClick} >
        로그인
      </Btn>
   
  );
}

export default LoginBtn;
