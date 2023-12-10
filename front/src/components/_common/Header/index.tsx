import React from "react";
import * as Style from "./styles";
import { Icon } from "../../../assets";

const Header = () => {
  return (
    <Style.Header>
      <Icon.Back />
      <div>사전 조사</div>
      <div>건너 뛰기</div>
    </Style.Header>
  );
};

export default Header;
