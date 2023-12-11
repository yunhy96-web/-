import styled from "@emotion/styled";

export const FunnelContainer = styled.section`
  margin: 0 18px;
  height: 100%;
  position: relative;
`;

export const NextButton = styled.div`
  position: fixed;
  bottom: 30px;
  width: calc(100% - 36px);
  left: 18px;
`;

export const WeekDayList = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.gray_1};
  padding: 16px;
  border-bottom: 1px solid #ececec;
  div {
    width: 40px;
    text-align: center;
  }
`;

export const CalendarScrollBox = styled.div`
  height: calc(100% - 208px);
  overflow: scroll;
  padding: 0 16px;
  padding-bottom: 48px;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const DestinationType = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 73px;
`;

export const SubTitle = styled.h3`
  font-family: Pretendard Variable;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 35px;
  color: ${({ theme }) => theme.colors.sub2};
  margin-bottom: 16px;
`;

export const DestinationInput = styled.input`
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  background: #fff;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray_1};
  padding: 8px 16px;
  //font
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px; /* 218.75% */
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  row-gap: 13px;
  margin-bottom: 36px;
`;
