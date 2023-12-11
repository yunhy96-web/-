import styled from "@emotion/styled";

export const Header = styled.header<{ borderBottom: boolean }>`
  position: fixed;
  display: flex;
  padding: 14px 8px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid
    ${({ borderBottom }) => (borderBottom ? "#ececec" : "transparent")};
  z-index: 20;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 63px;
`;

export const Text = styled.div`
  color: #292929;

  font-family: Pretendard Variable;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
