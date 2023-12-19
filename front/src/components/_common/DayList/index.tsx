import React from "react";
import * as Style from "./styles";

type Props = {
  totalDay: number;
  onClick: (day: number) => void;
  selectedDay: number;
};

const DayList = ({ totalDay, onClick, selectedDay }: Props) => {
  return (
    <Style.DayList>
      {Array.from({ length: totalDay }, (_, index) => (
        <div key={index} style={{ position: "relative", height: 45 }}>
          <Style.Day
            isSelected={selectedDay === index + 1}
            onClick={() => onClick(index)}
          >
            {`Day ${index + 1}`}
          </Style.Day>
          <Style.UnderLine isSelected={selectedDay === index + 1} />
        </div>
      ))}
    </Style.DayList>
  );
};

export default DayList;
