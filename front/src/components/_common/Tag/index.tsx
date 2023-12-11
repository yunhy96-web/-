import React from "react";
import * as Style from "./style";

type Props = {
  text: string;
  onClick: () => void;
  isActive: boolean;
};

const Tag = ({ text, onClick, isActive }: Props) => {
  return (
    <Style.Tag isActive={isActive} onClick={onClick}>
      {text}
    </Style.Tag>
  );
};

export default Tag;
