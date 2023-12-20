import styled from "@emotion/styled";

export const Content = styled.section`
  background: #f7f7f7;
  padding: 0 16px;
  padding-top: 80px;
  padding-bottom: 120px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow-y: auto;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Title = styled.h3`
  ${({ theme }) => theme.font.heading_1};
  text-align: left;
`;
export const Empty = styled.div`
  ${({ theme }) => theme.font.body_1};
  color: ${({ theme }) => theme.colors.gray_1};
  text-align: center;
  margin-top: 40px;
  white-space: pre-line;
  line-height: 30px; /* 187.5% */
`;
