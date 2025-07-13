import styled from 'styled-components';
export const Wrapper = styled.div`
background-color: #fcfcfc;
`
export const ButtonContainer = styled.div`
  display: flex;

  justify-content: flex-end;
  margin-bottom: 1rem;
  margin-top: 1rem;
  gap: 1rem;
  button {
    width: 8rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  .add-button {
    background-color: #15BDB1; /* Green */
    color: white;
    border: none;
  }
  .login-button {
    background-color: #0071C1; /* Blue */
    color: white;
    border: none;
  }

  /* 로그인 버튼 그라데이션 으로 */
  .login-button-gradient {
    background: linear-gradient(45deg, #0071C1, #00A9F4);
    color: white;
    border: none;
  }
`;