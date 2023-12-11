import React from "react";
import * as Style from "./style";

type Props = {
  totalPage: number;
  currentPage: number;
};
const ProgressBar = ({ totalPage, currentPage }: Props) => {
  return (
    <div>
      <Style.ProgressContainer>
        <Style.ProgressBar>
          <Style.Progress progress={currentPage / totalPage} />
        </Style.ProgressBar>
        <div>{`${currentPage}/${totalPage}`}</div>
      </Style.ProgressContainer>
    </div>
  );
};

export default ProgressBar;
