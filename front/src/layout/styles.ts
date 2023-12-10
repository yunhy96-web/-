import styled from "@emotion/styled";

export const Layout = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;
