import styled from "@emotion/styled";

export const Tab = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.colors.white};
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

export const Content = styled.section`
  background: #f7f7f7;
  padding: 0 16px;
  padding-top: 80px;
  padding-bottom: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow-y: auto;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.font.heading_1};
  text-align: left;
`;

export const CardTitle = styled.div`
  ${({ theme }) => theme.font.heading_2};
`;

export const Card = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  padding: 22px 26px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
`;

export const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
