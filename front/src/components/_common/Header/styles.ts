import styled from "@emotion/styled";

export const Header = styled.header`
  position: fixed;
  display: flex;
  padding: 14px 8px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ececec;
  z-index: 20;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
`;
