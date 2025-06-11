// ReviewForm.style.ts
import styled from "styled-components";

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
  padding: 7rem 2rem;
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