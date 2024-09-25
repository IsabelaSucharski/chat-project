/* eslint-disable @typescript-eslint/no-explicit-any */

const palette: any = {
  common: {
    white: {
      transparent: "transparent",
      default: "#fff",
      96: "#f5f5f5",
      98: "#fafafa",
    },
    black: {
      default: "#000",
      "01": "rgba(0, 0, 0, 0.01)",
      "02": "rgba(0, 0, 0, 0.02)",
      "08": "rgba(0, 0, 0, 0.08)",
      12: "rgba(0, 0, 0, 0.12)",
      25: "rgba(0, 0, 0, 0.25)",
      38: "rgba(0, 0, 0, 0.38)",
      45: "rgba(0, 0, 0, 0.45)",
      54: "rgba(0, 0, 0, 0.54)",
      66: "rgba(0, 0, 0, 0.66)",
      87: "rgba(0, 0, 0, 0.87)",
    },
  },
};

export default {
  common: {
    black: palette.common.black.default,
    white: "#fff",
    transparent: palette.common.white.transparent,
    ...palette.common.white,
    ...palette.common.black,
  },
  background: {
    default: "#FFFEFA",
    paper: palette.common.white.default,
    body: palette.common.white[96],
    opacity30: "rgba(255, 255, 255, 0.3)",
    opacity100: "rgba(245, 245, 245, 1)",
    hover: palette.common.black["08"],
    buttonSecondary: "#f04e23",
  },
  primary: {
    main: "#D2232A",
    light: "#FFECE7",
    contrastText: palette?.common?.white.default,
  },
  chat: {
    question: "FFCBBE",
    answer: "EFEFEF",
    grey: "EFEFEF",
  },
  secondary: {
    main: '#C12027',
    contrastText: palette.common.white.default,
  },
  error: {
    main: "#d93025",
    light: "#ff674f",
    dark: "#9f0000",
    contrastText: palette.common.white.default,
  },
  inherit: {
    main: "#000",
  },
  warning: {
    main: "#ff9800",
    light: "#ffb74d",
    dark: "#db5315",
    contrastText: palette.common.black[87],
  },
  info: {
    main: "#1976d2",
    light: "#64b5f6",
    dark: "#1976d2",
    contrastText: palette.common.white.default,
  },
  success: {
    main: "#4caf50",
    light: "#80e27e",
    dark: "#087f23",
    contrastText: palette.common.black[87],
  },
  text: {
    primary: palette.common.black[87],
    secondary: palette.common.black[54],
    disabled: palette.common.black[38],
    hint: palette.common.black[38],
  },
  shadow: {
    default: `0 1px 8px  ${palette.common.black["08"]}`,
    medium: `0 2px 8px ${palette.common.black["08"]}`,
    wide: `0 4px 12px ${palette.common.black[12]}`,
  },
  border: {
    default: palette.common.black[50],
    light: palette.common.black[12],
  },
};