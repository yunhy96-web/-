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
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

export const DuringDate = styled.div`
  position: absolute;
  z-index: 0;
  width: calc(((100vw - 40px) / 7) + 20px);
  left: 20px;
  height: 40px;
  background-color: #ffeede;

  @media (min-width: 761px) {
    width: calc(((393px - 40px) / 7) + 20px);
  }
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
  /* z-index: 0; */

  border-radius: ${({ isStartDate, isEndDate }) =>
    isStartDate && isEndDate
      ? "8px"
      : isStartDate
      ? "8px 0 0 8px"
      : isEndDate
      ? "0 8px 8px 0"
      : "none"};
`;

export const Date = styled.div<{
  isSelected: boolean;
  isDuring: boolean;
  disabled: boolean;
}>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => !disabled && "pointer"};
  border-radius: 8px;
  position: relative;
  z-index: 1;
  ${({ theme }) => theme.font.body_1};
  ${({ theme, isSelected, isDuring, disabled }) => `
    color: ${
      isSelected
        ? theme.colors.white
        : isDuring
        ? theme.colors.main
        : disabled
        ? theme.colors.gray
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
