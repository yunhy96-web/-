import styled from "@emotion/styled";

export const Text = styled.div`
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 31px;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.sub2};
  margin-bottom: 41px;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-bottom: 50px;
`;
