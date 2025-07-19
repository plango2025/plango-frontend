// ReviewForm.style.ts
import styled, { keyframes } from "styled-components";

export const TextBox = styled.textarea`
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  padding: 12px;
  resize: none;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

// 애니메이션 정의
const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SelectScheduleWrapper = styled.div`
  animation: ${slideDown} 0.3s ease-out;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  z-index: 100;
  border-bottom: 1px solid #ededed;
`;

export const ChooseSchedule = styled.h3`
display:flex;
gap: 0.5rem;
align-item:center;
text-align:center;
line-height:1;
  font-size: 20px;
  margin-bottom: 12px;
  padding-left:3rem;
  padding-top:1rem;
`;

export const ScheduleList = styled.div`
  display: flex;
  padding: 0 2.3rem;
  gap: 12px;
  overflow-y: scroll;
  margin-bottom: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const SelectedScheduleTitle = styled.p`
  display: flex;

  font-size: 24px;
  font-weight:bold;


  color: #15bdb1;
  height: 100px;
  line-height: 100px;
  align-items: center;
  text-align: center;
 
`;
export const Rating = styled.div`
  padding-top: 0.3rem;
  padding-left: 0.6rem;

`;
export const Button = styled.button`
  display: flex;
  align-items: center;
  height: 4rem;
  padding-right:1rem;
  background-color: white;
  color: #15bdb1;
  font-size: 30px;
`;

export const BackGround = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: #f8f9fa;

  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 16px;

  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  margin: 4rem auto;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  input[type="text"] {
    font-size: 2rem;
    padding: 2rem;
  }
  input:focus {
    border: none;
    outline: none;
  }
  textarea {
    font-size: 1.4rem;
    padding: 0.75rem;
    border-radius: 8px;
  }

  textarea {
    padding: 0 3rem;
    min-height: 150px;
    resize: vertical;
    border: none;
    &:focus {
      border: none;
      outline: none;
    }
  }

  .chakra-file-upload__dropzone {
    border: 2px dashed #dee2e6;
    background-color: #fafafa;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: #f1f3f5;
    }
  }
`;
export const Bottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 1000px;

  height: 70px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  z-index: 1000; /* 필요 시 위로 띄움 */
`;
export const SidePadding = styled.div`
  padding: 2rem  2rem 7rem 2rem; 
  width: 100%;
`;
export const SubmitBtn = styled.button`
  width: 100%;
  max-width: 300px;
  height: 50px;
  padding: 0.75rem 1.5rem;
  background-color: #15bdb1;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #109a90;
  }
`;
