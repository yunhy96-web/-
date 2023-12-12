import styled from "@emotion/styled";

export const MonthTitle = styled.div`
  width: 100%;
  margin: 24px 0 12px 0;
  text-align: center;
  ${({ theme }) => theme.font.heading_3}
`;
export const Month = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const Week = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DuringDate = styled.div`
  position: absolute;
  z-index: -1;
  width: calc(((100vw - 40px) / 7) + 20px);
  left: 20px;
  height: 40px;
  background-color: #ffeede;
`;

export const DateCell = styled.div<{
  isDuring: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isSameMonth: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  background: ${({ isDuring, isStartDate, isEndDate, isSameMonth }) =>
    !isSameMonth ? "transparent" : isDuring ? "#FFEEDE" : "transparent"};

  border-radius: ${({ isStartDate, isEndDate }) =>
    isStartDate && isEndDate
      ? "8px"
      : isStartDate
      ? "8px 0 0 8px"
      : isEndDate
      ? "0 8px 8px 0"
      : "none"};
`;

export const Date = styled.div<{ isSelected: boolean; isDuring: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  ${({ theme }) => theme.font.body_1};
  ${({ theme, isSelected, isDuring }) => `
    color: ${
      isSelected
        ? theme.colors.white
        : isDuring
        ? theme.colors.main
        : theme.colors.sub2
    };
    background-color: ${
      isSelected
        ? theme.colors.main
        : isDuring
        ? "#FFEEDE" //
        : "transparent"
    };
  `}
`;
