import styled from "@emotion/styled";

export const Input = styled.input<{ width: string | number }>`
  border: 1px solid #e0e0e0;
  padding: 8px 16px;
  width: ${({ width }) => width};
  border-radius: 8px;
`;
