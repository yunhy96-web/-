export type DefaultTheme = typeof theme;

const theme = {
  colors: {
    main: "#FF7A00",
    main_sub: "#FFEEDE",
    gradient: "linear-gradient(180deg, #FF7B01 0%, #FFBF5E 100%)",
    error: "#FF5D3A",

    //
    title: "#292929",
    sub: "#757575",
    sub2: "#3B3A3A",
    gray: "#DDDDDD",
    gray_1: "#999999",
    strock: "#E0E0E0",
    white: "#FFFFFF",
  },
  font: {
    btn: `text-align: center;
font-family: Pretendard Variable;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;`,
    heading_1: `text-align: center;
font-family: Pretendard Variable;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: normal;`,
    heading_2: `text-align: center;
font-family: Pretendard Variable;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: normal;`,
    heading_3: `font-family: Pretendard Variable;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: normal;`,
    body_1: `
font-family: Pretendard Variable;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;`,
    body_2: `font-family: Pretendard Variable;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;`,
    body_3: `font-family: Pretendard Variable;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: normal;`,
    caption_1: `font-family: Pretendard Variable;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;`,
    caption_2: `font-family: Pretendard Variable;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;`,
  },
};

export default theme;
