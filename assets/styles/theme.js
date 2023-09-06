import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#0e1111",
  secondary: "rgb(247, 157, 40)",
  background: "rgb(242, 242, 242)",
  border: "transparent",
  card: "rgb(255, 255, 255)",
  notification: "rgb(255, 59, 48)",
  text: "#0e1111",
  lightText: "#6D6E71",

  // colors
  blue: "#00699B",
  lightblue: "#3BA4B6",
  brown: "#C07D53",
  yellow: "#FFDE6D",
  darkYellow: "#F1BC19",
  orange: "#FB9039",
  lightOrange: "#FFF4E7",
  lightGray: "#D3D3D3",
  darkGray: "#898C95",
  white: "#fff",
  danger: "tomato",
  green: "#97C94B",
};

export const SIZES = {
  // global sizes
  base: 10,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 16,
  body1: 30,
  body2: 20,
  body3: 18,
  body4: 16,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontWeight: "bold",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: {
    fontWeight: "bold",
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontWeight: "bold",
    fontSize: SIZES.h2,
    lineHeight: 30,
  },
  h3: {
    fontWeight: "bold",
    fontSize: SIZES.h3,
    lineHeight: 24,
  },
  h4: {
    fontWeight: "bold",
    fontSize: SIZES.h4,
    lineHeight: 20,
  },
  body1: {
    fontWeight: "normal",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontWeight: "normal",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontWeight: "normal",
    fontSize: SIZES.body3,
    lineHeight: 26,
  },
  body4: {
    fontWeight: "normal",
    fontSize: SIZES.body4,
    lineHeight: 20,
  },
  caption: {
    fontWeight: "normal",
    color: COLORS.lightText,
    fontSize: SIZES.body3,
    lineHeight: 26,
  },
};

export const STYLES = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

const appTheme = { COLORS, SIZES, FONTS, STYLES };

export default appTheme;
