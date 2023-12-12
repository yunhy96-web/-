import React from "react";
import { PeriodTag } from "../_common/Tag/PeriodTab";
import dayjs from "dayjs";
import * as Style from "./styles";

type Props = {
  startDate: string;
  endDate: string;
  title: string;
};

const MyScheduleCard = ({ startDate, endDate, title }: Props) => {
  const period = dayjs(endDate).diff(dayjs(startDate), "day") + 1;

  return (
    <Style.Card>
      <Style.CardLeft>
        <PeriodTag>
          {period}박 {period}일
        </PeriodTag>
        <Style.CardTitle>{title}</Style.CardTitle>
        <div>{`${startDate} ~ ${endDate}`}</div>
      </Style.CardLeft>
      <div>더보기</div>
    </Style.Card>
  );
};

export default MyScheduleCard;
