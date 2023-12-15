import styled from "@emotion/styled";

export const Layout = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  min-width: 360px;
  background: white;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }

  @media (max-width: 760px) {
    width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 761px) {
    width: 393px;
    position: relative;
    border: 1px solid #ececec;
    box-sizing: content-box;
  }
`;
