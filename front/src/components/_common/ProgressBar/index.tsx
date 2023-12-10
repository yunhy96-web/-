import React from "react";
import * as Style from "./style";

const ProgressBar = () => {
  return (
    <div>
      <Style.ProgressBar>
        <Style.Progress progress={3 / 3} />
      </Style.ProgressBar>
    </div>
  );
};

export default ProgressBar;
