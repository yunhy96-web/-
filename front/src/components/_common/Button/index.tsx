import React from "react";
import * as Style from "./style";

type Props = {
  color?: "primary" | "disabled";
  text: string;
  onClick: () => void;
  width?: number | string;
};

const Button = ({
  color = "primary",
  text,
  onClick,
  width = "100%",
}: Props) => {
  return (
    <Style.Button onClick={onClick} color={color} width={width}>
      <Style.ButtonText>{text}</Style.ButtonText>
    </Style.Button>
  );
};

export default Button;
