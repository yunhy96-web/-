import styled from "@emotion/styled";

export const Layout = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  min-width: 360px;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;
