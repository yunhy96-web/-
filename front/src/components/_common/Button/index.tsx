import React from "react";
import * as Style from "./style";

type Props = {
  color?: "primary" | "gradient" | "disabled" | "gray";
  text: string;
  onClick: () => void;
  width?: number | string;
  left?: JSX.Element;
  size?: "sm" | "lg";
};

const Button = ({
  color = "primary",
  text,
  onClick,
  width = "100%",
  left,
  size = "lg",
}: Props) => {
  return (
    <Style.Button
      disabled={color === "disabled"}
      size={size}
      onClick={onClick}
      color={color}
      width={width}
    >
      {left && left}
      <div>{text}</div>
    </Style.Button>
  );
};

export default Button;
