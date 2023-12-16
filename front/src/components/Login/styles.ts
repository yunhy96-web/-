import styled from "@emotion/styled";

export const Container = styled.section`
  height: 100%;
  position: relative;
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
  position: absolute;
  bottom: 60px;
  /* width: calc(100% - 32px); */
  border-radius: 8px;
  overflow: hidden;
  left: calc((100% - 328px) / 2);
`;

export const Title = styled.div`
  color: #fff;
  font-family: S-Core Dream;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const Login = styled.div`
  color: #fff;
  font-family: Pretendard Variable;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
