import styled from "@emotion/styled";

export const ProgressBar = styled.div`
  background: #ebebeb;
  width: 100%;
  height: 6px;
  border-radius: 50px;
  margin-right: 12px;
  position: relative;
  overflow: hidden;
`;
export const Progress = styled.div<{ progress: number }>`
  background: ${({ theme }) => theme.colors.main};
  position: absolute;
  width: ${({ progress }) => 100 * progress}%;
  height: 6px;
  z-index: 3;
  transition: 0.15s ease-in-out;
`;
