import { AppProps } from "next/app";
// import "../../styles/global.css";
import * as React from "react";
import { store } from "@app-client/store";
import { Provider } from "react-redux";
import Head from "next/head";
import { ThemeProvider,createTheme } from "@material-ui/core/styles";
require("../../styles/variables.less");

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    secondary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }:any) => {
  return (
    <Provider store={store}>
      <Head>
        <title>Apartment for rent</title>
        <link
          rel="icon"
          href="https://vconomics.io/svg/icon-vconomics.svg"
        ></link>
      </Head>
      <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      </ThemeProvider>
      
    </Provider>
  ); //...pageProps to spread all props passed thru
};

export default CustomApp;
