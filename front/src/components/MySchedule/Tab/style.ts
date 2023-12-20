import styled from "@emotion/styled";

export const Tab = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  z-index: 40;
  background: ${({ theme }) => theme.colors.white};

  @media (max-width: 760px) {
    width: 100%;
  }

  @media (min-width: 761px) {
    width: 393px;
    /* position: relative; */
  }
`;

export const TabItem = styled.div<{ isSelected: boolean }>`
  width: 100%;
  padding: 14px 0;
  ${({ theme }) => theme.font.heading_2}
  border-bottom: ${({ theme, isSelected }) =>
    isSelected ? `2px solid ${theme.colors.main}` : "1px solid #E6E4E4"};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.main : theme.colors.sub2};
  cursor: pointer;
`;
