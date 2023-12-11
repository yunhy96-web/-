import React from "react";
import * as Style from "./style";

type Props = {
  color?: "primary" | "disabled";
  text: string;
  onClick: () => void;
  width?: number | string;
  left?: JSX.Element;
};

const Button = ({
  color = "primary",
  text,
  onClick,
  width = "100%",
  left,
}: Props) => {
  return (
    <Style.Button onClick={onClick} color={color} width={width}>
      {left && left}
      <Style.ButtonText>{text}</Style.ButtonText>
    </Style.Button>
  );
};

export default Button;
