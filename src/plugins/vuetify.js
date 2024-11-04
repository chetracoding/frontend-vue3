// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const customTheme = {
  dark: false,
  colors: {
    primary: "#FF5252", // purple
    secondary: "#02BDFE", // blue
    success: "#4CAF50", // green
    info: "#E468A2", // pink
    warning: "#FCBE01", // yellow
    error: "#D32F2F", // red, just added
    // surface: {
    //   base: "#F8F9FC", // light-grey
    //   darken1: "#E0E0E0",
    //   darken2: "#BDBDBD",
    //   darken4: "#333333",
    // },
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
});
