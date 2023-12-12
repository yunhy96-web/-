import styled from "@emotion/styled";

export const PeriodTag = styled.div`
  padding: 4px 8px;
  font-family: Pretendard Variable;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.main};
  border-radius: 5px;
  background: #ffe4cb;
  width: fit-content;
`;
