import React from "react";

/**
 *
 * @param date 0000년 00월 00일
 */
const convertDateFormmat = (date: string) => {
  return date
    .split(" ")
    .map((item) => {
      return item.replace(/\D/g, "");
    })
    .join("-");
};

export default convertDateFormmat;
