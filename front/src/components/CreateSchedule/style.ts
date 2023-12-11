import styled from "@emotion/styled";

export const FunnelContainer = styled.section`
  margin-top: 63px;
  height: calc(100% - 63px);
  position: relative;
`;

export const LoadingTitle = styled.div`
  font-family: Pretendard Variable;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.main};
  margin-bottom: 12px;
`;

export const LoadingSubTitle = styled.div`
  color: #797979;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 100px;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Skip = styled.div`
  color: #8a8a8a;

  font-family: Pretendard Variable;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.36px;
  text-decoration-line: underline;
`;
