import styled from "@emotion/styled";

export const Box = styled.button<{ isActive: boolean }>`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 2px solid
    ${({ isActive, theme }) => (isActive ? theme.colors.main : "#e0e0e0")};
  cursor: pointer;
  padding: 16px 15px 16px 20px;
  border-radius: 8px;
  background: ${({ isActive, theme }) => (isActive ? "#FF7A0021" : "white")};

  transition: all 0.15s ease-in-out;

  div {
    font-family: Pretendard Variable;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    width: 100%;
    text-align: left;
    vertical-align: middle;
    color: ${({ isActive, theme }) =>
      isActive ? theme.colors.main : theme.colors.sub};
  }
`;
