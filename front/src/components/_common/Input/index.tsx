import React from "react";
import * as Style from "./style";
type Props = {
  width: string | number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ width, ...rest }: Props) => {
  return <Style.Input width={width} {...rest} />;
};

export default Input;
