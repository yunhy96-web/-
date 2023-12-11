import React from "react";
import * as Style from "./styles";
import { Icon } from "../../../assets";
import { useNavigate } from "react-router-dom";

type Props = {
  back?: boolean;
  title: string;
  right?: {
    onClick: () => void;
    content: JSX.Element;
  };
};

const Header = ({ back, title, right }: Props) => {
  const navigate = useNavigate();
  return (
    <Style.Header>
      {back && <Icon.Back onClick={() => navigate(-1)} />}
      <div>{title}</div>
      {right && <div onClick={right.onClick}>{right.content}</div>}
    </Style.Header>
  );
};

export default Header;
