/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      black: "#000000",
      white: "#ffffff",
      000000: {
        color: {
          chage: {
            tokensDefaultToken: {
              json: {
                true: {
                  primary: {
                    objectObject: {
                      primary: {
                        objectObject: {
                          primary: {
                            chage: {
                              primary: "#000000"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      secondary: "#ffffff",
      tertiary: "#f5f5f5",
      accent: "#0075ff",
      negative: "#e11900",
      warning: "#ffc043",
      positive: "#048848",
      positiveTransparent: "rgba(4, 136, 72, 0.1)",
      negativeTranparent: "rgba(225, 25, 0, 0.1)",
      blue: {
        100: "#cce3ff",
        200: "#99c8ff",
        300: "#66acff",
        400: "#3391ff",
        500: "#0075ff",
        600: "#005ecc",
        700: "#004699",
        800: "#002f66",
        900: "#001733"
      },
      red: {
        100: "#ffcccc",
        200: "#ff9999",
        300: "#ff6666",
        400: "#ff3333",
        500: "#ff0000",
        600: "#cc0000",
        700: "#990000",
        800: "#660000",
        900: "#330000"
      },
      yellow: {
        100: "#fff4cc",
        200: "#ffe999",
        300: "#ffdd66",
        400: "#ffd233",
        500: "#ffc700",
        600: "#cc9f00",
        700: "#997700",
        800: "#665000",
        900: "#332800"
      },
      green: {
        100: "#d7f8cc",
        200: "#b0f199",
        300: "#88eb66",
        400: "#61e433",
        500: "#39dd00",
        600: "#2eb100",
        700: "#228500",
        800: "#175800",
        900: "#0b2c00"
      },
      contents: {
        contentPrimary: "#000000",
        contentSecondary: "#6b6b6b",
        contentTertiary: "#a6a6a6"
      },
      gray: {
        100: "#e1e1e1",
        200: "#c4c4c4",
        300: "#a6a6a6",
        400: "#898989",
        500: "#6b6b6b",
        600: "#565656",
        700: "#404040",
        800: "#2b2b2b",
        900: "#151515"
      },
      border: {
        borderTransparent: "rgba(137, 137, 137, 0.3)",
        borderOpaque: "#898989"
      },
      info: {
        accent: "#0075ff",
        negative: "#ff0000",
        warning: "#ffc700",
        positive: "#39dd00",
        positiveTransparent: "rgba(57, 221, 0, 0.1)",
        negativeTransparent: "rgba(255, 0, 0, 0.1)"
      },
      pink: {
        100: "#f8ccf9",
        200: "#f099f2",
        300: "#e966ec",
        400: "#e233e5",
        500: "#db00df",
        600: "#af00b2",
        700: "#830086",
        800: "#570059",
        900: "#2c002d"
      },
      oragne: {
        orange: "#fc9300"
      },
      above: {
        high: "0 -16px 48px 0 #0000004d",
        medium: "0 -8px 36px 0 #00000033",
        low: "0 -4px 24px 0 #0000001a"
      },
      below: {
        high: "0 16px 48px 0 #0000004d",
        medium: "0 8px 36px 0 #00000033",
        low: "0 4px 24px 0 #0000001a"
      },
      fontFamilies: {
        pretendard: "Pretendard"
      },
      lineHeights: {
        0: 1.4,
        1: 1.4,
        2: 1.4,
        3: 1.4,
        4: 1.4,
        5: 1.5,
        6: 1.5,
        7: 1.5,
        8: 1.5,
        9: 1.5,
        10: 1.6,
        11: 1.6,
        12: 1.6,
        13: 1.6
      },
      fontWeights: {
    "pretendard_0": 700,
    "pretendard_1": 600,
    "pretendard_2": 400
      },
      fontSize: {
        0: "50.516998291015625px",
        1: "37.89699935913086px",
        2: "28.43000030517578px",
        3: "21.327999114990234px",
        4: "16px",
        5: "37.89699935913086px",
        6: "28.43000030517578px",
        7: "21.327999114990234px",
        8: "16px",
        9: "12.003000259399414px",
        10: "28.43000030517578px",
        11: "21.327999114990234px",
        12: "16px",
        13: "12.003000259399414px"
      },
      letterSpacing: {
        0: "0em",
        1: "0em",
        2: "0em",
        3: "0em",
        4: "0em",
        5: "0em",
        6: "0em",
        7: "0em",
        8: "0em",
        9: "0em",
        10: "0em",
        11: "0em",
        12: "0em",
        13: "0em"
      },
      paragraphSpacing: {
        0: "0",
        1: "0",
        2: "0",
        3: "0",
        4: "0",
        5: "0",
        6: "0",
        7: "0",
        8: "0",
        9: "0",
        10: "0",
        11: "0",
        12: "0",
        13: "0"
      },
      heading: {
        xxxl: "700 50.517px/1.4 Pretendard",
        xxl: "700 37.897px/1.4 Pretendard",
        xl: "700 28.43px/1.4 Pretendard",
        large: "700 21.328px/1.4 Pretendard",
        medium: "700 16px/1.4 Pretendard"
      },
      label: {
        xxl: "600 37.897px/1.5 Pretendard",
        xl: "600 28.43px/1.5 Pretendard",
        large: "600 21.328px/1.5 Pretendard",
        medium: "600 16px/1.5 Pretendard",
        small: "600 12.003px/1.5 Pretendard"
      },
      paragraph: {
        xl: "400 28.43px/1.6 Pretendard",
        large: "400 21.328px/1.6 Pretendard",
        medium: "400 16px/1.6 Pretendard",
        small: "400 12.003px/1.6 Pretendard"
      },
      textCase: {
        none: "none"
      },
      textDecoration: {
        none: "none"
      },
      paragraphIndent: {
        0: "0px"
      }
    },
  },
}