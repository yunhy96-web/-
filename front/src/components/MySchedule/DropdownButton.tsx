import React from "react";
import * as Style from "./styles";

type Props = {
  onClick: () => void;
};

const DropdownButton = ({ onClick }: Props) => {
  return (
    <Style.CircleButton onClick={onClick}>
      <Style.Circle />
      <Style.Circle />
      <Style.Circle />
    </Style.CircleButton>
  );
};

export default DropdownButton;
