import { createTheme } from "@mui/material/styles";
import colors from "./colors";

export default createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 914,
      lg: 1200,
      xl: 1920,
    },
  },
  palette: {
    ...colors,
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
        label: {
          color: "#FFF",
          textAlign: "center",
          fontFamily: "Noto Sans",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "166%",
          letterSpacing: "0.4px",

          "@media screen and (max-width: 900px)": {
            fontSize: "10px",
          },
          "@media screen and (min-width: 900px) and (max-width: 1300px) ": {
            fontSize: "11px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            border: "1px #B01D23",
          },
          "& .MuiInputBase-multiline": {
            padding: 0,
            "& > textarea": {
              overflow: "auto  !important",
              padding: "8.5px 14px",
              "@media screen and (min-width: 900px) and (max-width: 1300px)": {
                height: "16.5rem  !important",
              },
              "@media screen and (min-width: 1300px) and (max-width: 1400px)": {
                height: "20rem !important",
              },
              "@media screen and (min-width: 1400px)": {
                height: "25rem !important",
              },
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#B01D23",
            borderWidth: "1px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // padding: "10px 24px",
          gap: "8px",
          borderRadius: "100px",
          "&.MuiButton-outlined, &.MuiButton-contained": {
            textAlign: "center",
            fontFamily: "Noto Sans",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "24px",
            letterSpacing: "0.4px",
            textTransform: "uppercase",
            "&:focus": {
              outline: "0",
            },
          },
          "&.MuiButton-outlined": {
            background: "transparent",
            "& .MuiSvgIcon-root": {
              color: "var(--M3-sys-light-Secondary-secondary, #C12027)",
            },
          },
          "&.MuiButton-contained": {
            background: "var(--M3-sys-light-Secondary-secondary, #C12027)",
            "& .MuiSvgIcon-root": {
              color: "#fff",
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "28px",
          border: "1px solid var(--other-border, rgba(0, 0, 0, 0.23))",
          background: "var(--M3-sys-light-surface, #FFFEFA)",
          padding: "30px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: "var(--palette-text-primary, rgba(0, 0, 0, 0.87))",
          fontFamily: '"Co Headline"',
          fontSize: "24px !important",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "32px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "0 32px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "var(--M3-sys-light-on-surface, #261F1C)",
          textAlign: "center",
          fontFamily: '"Co Text"',
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "175%",
          letterSpacing: "0.15px",
          "&.Mui-selected": {
            outline: "none",
          },

          "@media screen and (max-width: 900px)": {
            fontSize: "12px",
          },
          "@media screen and (min-width: 900px) and (max-width: 1300px) ": {
            fontSize: "14px",
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .headerFont": {
            color: "var(--M3-sys-light-on-surface, #C12027)",
            textAlign: "center",
            fontFamily: '"Co Text"',
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "175%",
            letterSpacing: "0.15px",
            "@media screen and (max-width: 900px)": {
              fontSize: "11px",
            },
            "@media screen and (min-width: 900px) and (max-width: 1300px) ": {
              fontSize: "12px",
            },
          },
          fontFamily: "Noto Sans",
          // fontSize: "24px",
          "@media screen and (max-width: 900px)": {
            fontSize: "11px",
          },
          "@media screen and (min-width: 900px) and (max-width: 1300px) ": {
            fontSize: "12px",
          },
          "& .MuiDataGrid-row:hover, .MuiDataGrid-row:active": {
            backgroundColor: colors.primary.light,
            cursor: "pointer",
          },
          ["& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within"]: {
            outline: "none",
          },
          ["& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within"]:
            {
              outline: "none",
            },
          "& > .MuiDataGrid-main > .MuiDataGrid-virtualScroller > .MuiDataGrid-virtualScrollerContent":
            {
              height: "0px !important",
            },
          "& > .MuiDataGrid-main > .MuiDataGrid-scrollbar": {
            overflow: "hidden",
          },
          "& .MuiDataGrid-row": {
            height: "45px !important",
            maxHeight: "45px !important",
            minHeight: "45px !important",
            "@media screen and (max-width: 1300px) ": {
              height: "40px !important",
              maxHeight: "40px !important",
              minHeight: "40px !important",
            },
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#EFEFEF",
        },
        action: {
          margin: "0",
          alignSelf: "center",
        },
        title: {
          textAlign: "left",
          color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
          fontFamily: '"Co Headline"',
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "160%",
          "@media screen and (max-width: 900px)": {
            fontSize: "14px",
          },
          "@media screen and (min-width: 900px) and (max-width: 1300px) ": {
            fontSize: "16px",
          },
        },
        subheader: {
          textAlign: "left",
          color: "var(--text-secondary, rgba(0, 0, 0, 0.54))",
          fontFamily: '"Noto Sans"',
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "16px",
          "@media screen and (max-width: 900px)": {
            fontSize: "10px",
          },
          "@media screen and (min-width: 900px) and (max-width: 1300px) ": {
            fontSize: "11px",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          overflowY: "auto",
          backgroundColor: "inherit",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          position: "absolute",
          bottom: "0",
          width: "100%",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Noto Sans",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "143%",
          letterSpacing: "0.15px",
          textAlign: "left",

          "&.header": {
            fontSize: "24px",

            "@media screen and (max-width: 900px)": {
              fontSize: "18px",
            },
            "@media screen and (min-width: 900px) and (max-width: 1300px) ": {
              fontSize: "20px",
            },
          },
          "@media screen and (max-width: 900px)": {
            fontSize: "11px",
          },
          "@media screen and (min-width: 900px) and (max-width: 1300px) ": {
            fontSize: "12px",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "89vh",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.pagePaper": {
            backgroundColor: "transparent",
            padding: "32px",
            width: "100%",
            height: "100%",
            "@media screen and (max-width: 900px)": {
              padding: "16px",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "& .MuiLoadingButton-loadingIndicator": {
            color: colors.common.white,
          },
        },
      },
    },
  },
});
