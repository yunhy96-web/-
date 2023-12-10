import styled from "@emotion/styled";

export const Container = styled.section`
  height: 100%;
`;

export const Background = styled.div`
  display: flex;
  background-image: url("/images/login.webp");
  height: 100%;
  background-size: cover;
  background-position-y: 0;
  background-repeat: no-repeat;
  filter: brightness(70%);
`;

export const KakaoLoginButton = styled.button`
  position: fixed;
  bottom: 60px;
  width: calc(100% - 32px);
  margin: 0 16px;
  background: #ffdb00;
  border-radius: 8px;
  padding: 20px;
`;
