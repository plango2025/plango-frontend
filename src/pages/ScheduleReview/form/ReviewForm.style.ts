// ReviewForm.style.ts
import styled from "styled-components";

export const BackGround = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: #f8f9fa;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormContainer = styled.div`

  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 3rem 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
  }

  input[type="text"],
  textarea {
    font-size: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  textarea {
    min-height: 150px;
    resize: vertical;
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
