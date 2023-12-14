import styled from "@emotion/styled";

export const Button = styled.button<{
  color: "primary" | "disabled" | "gradient" | "gray";
  width: number | string;
  size: "sm" | "lg";
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
  border-radius: 8px;
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  background: ${({ color, theme }) =>
    color === "primary"
      ? theme.colors.main
      : color === "gradient"
      ? theme.colors.gradient
      : color === "gray"
      ? "#F5F5F5"
      : "#EFDCCA"};
  border: none;
  color: ${({ color, theme }) =>
    color === "primary"
      ? theme.colors.white
      : color === "gradient"
      ? theme.colors.white
      : color === "gray"
      ? theme.colors.sub2
      : "#e9ecef"};
  padding: 18px 0;

  div {
    ${({ theme, size }) =>
      size === "sm" ? theme.font.btn : theme.font.heading_3};
  }
`;
