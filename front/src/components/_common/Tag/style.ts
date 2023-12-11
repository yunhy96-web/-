import styled from "@emotion/styled";

export const Tag = styled.button<{ isActive: boolean }>`
  padding: 5px 13px;
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive ? theme.colors.main : theme.colors.sub};

  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.main : theme.colors.sub};

  background: ${({ theme, isActive }) =>
    isActive ? "#FFEEDE" : theme.colors.white};

  border-radius: 50px;
  font-family: Pretendard Variable;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;
