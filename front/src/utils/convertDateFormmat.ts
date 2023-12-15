/**
 *
 * @param date 0000년 00월 00일
 */
const convertDateFormmat = (date: string) => {
  // if(true){
  // }
  const dateForm = date.replaceAll(/\D/g, "");
  return (
    dateForm.slice(0, 4) +
    "-" +
    dateForm.slice(4, 6) +
    "-" +
    dateForm.slice(6, 8)
  );
  // return date
  //   .split(" ")
  //   .map((item) => {
  //     return item.replace(/\D/g, "");
  //   })
  //   .join("-");
};

export default convertDateFormmat;
