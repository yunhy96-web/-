import styled from "@emotion/styled";

export const TabNavigator = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
`;

export const TabList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 8px 20px;
  /* padding: 8px 20px 44px 20px; */
  width: 100%;
`;

export const TabItem = styled.li<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60px;
  justify-content: space-between;
  ${({ isActive, theme }) => `
    ${isActive ? `color: ${theme.colors.main};` : `${theme.colors.sub2};`}
    ${theme.font.body_2}
    cursor: pointer;
  `}
`;
