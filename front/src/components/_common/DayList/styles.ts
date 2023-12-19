import styled from "@emotion/styled";

export const DayList = styled.div`
  display: flex;
  gap: 17px;
  min-width: 100%;
  border-bottom: 1px solid #dddddd;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 12px 16px 0 16px;
  height: 73px;

  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Day = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  min-width: 72px;
  padding: 13px 0;
  white-space: nowrap;
  height: 100%;
  cursor: pointer;

  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.main : theme.colors.sub};

  font-family: Pretendard Variable;
  font-size: 18px;
  font-style: normal;
  font-weight: ${({ theme, isSelected }) => (isSelected ? 600 : 500)};
  line-height: normal;
  position: relative;
  z-index: 1;

  transition: 0.05s ease-in-out;
`;

export const UnderLine = styled.div<{ isSelected: boolean }>`
  position: absolute;
  width: 72px;
  bottom: -1px;
  height: 2px;
  z-index: 10;
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.main : "transparent"};
`;
