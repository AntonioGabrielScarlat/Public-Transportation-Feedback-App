import "../styles/globals.css";
import "../styles/register.css";
import "../styles/login.css";
import "../styles/NavBar.css";
import "../styles/NavButton.css";
import "../styles/profile.css";
import App from "next/app";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
export default MyApp;
