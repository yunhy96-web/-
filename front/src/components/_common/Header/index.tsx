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
  borderBottom?: boolean;
};

const Header = ({ back, title, right, borderBottom = true }: Props) => {
  const navigate = useNavigate();
  return (
    <Style.Header borderBottom={borderBottom}>
      <div
        style={{
          width: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {back ? <Icon.Back onClick={() => navigate(-1)} /> : <div />}
      </div>
      <Style.Text>{title}</Style.Text>
      <div
        style={{
          width: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        onClick={right?.onClick}
      >
        {right && right.content}
      </div>
    </Style.Header>
  );
};

export default Header;
