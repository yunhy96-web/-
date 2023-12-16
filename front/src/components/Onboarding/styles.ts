import styled from "@emotion/styled";

export const Container = styled.section`
  height: 100%;
`;

export const Background = styled.div`
  display: flex;
  background-image: url("/images/onboarding.webp");
  height: 100%;
  background-position-x: center;
  /* background-size: contain; */
  background-size: cover;
  background-position-y: 0;
  background-repeat: no-repeat;
  filter: brightness(70%);
`;

export const StartButton = styled.button`
  position: fixed;
  bottom: 0;
  background: linear-gradient(90deg, #ffbe5d 13.49%, #ff7a00 83.72%);
  padding: 12px 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-family: Pretendard Variable;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 35px;

  @media (min-width: 761px) {
    width: 393px;
    left: calc((100% - (393px)) / 2);
    /* position: relative; */
  }
`;
