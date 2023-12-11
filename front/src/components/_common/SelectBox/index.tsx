import React from "react";
import * as Style from "./style";
import { Icon } from "../../../assets";

type Props = {
  isActive: boolean;
  text: string;
  onClick: (text: string) => void;
};

const SelectBox = ({ isActive, text, onClick }: Props) => {
  return (
    <Style.Box onClick={() => onClick(text)} isActive={isActive}>
      <div>{text}</div>
      {isActive ? <Icon.Check /> : <span style={{ width: 20, height: 20 }} />}
    </Style.Box>
  );
};

export default SelectBox;
