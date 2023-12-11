import styled from "@emotion/styled";

export const Button = styled.button<{
  color: "primary" | "disabled";
  width: number | string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
  border-radius: 8px;
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  background-color: ${({ color, theme }) =>
    color === "primary" ? theme.colors.main : "#e9ecef"};
  border: none;
  color: ${({ color, theme }) =>
    color === "primary" ? theme.colors.white : "#e9ecef"};
  padding: 18px 0;
`;

export const ButtonText = styled.div`
  font-family: Pretendard Variable;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;
