import Footer from "./Footer";
import Header from "./Header";
import { useMoralis } from "react-moralis";
import Head from "next/head";

export default function Layout({ children }) {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
    isWeb3Enabled,
  } = useMoralis();

  return (
    <div style={{background:"#000", backgroundImage:"url('https://storage.googleapis.com/twg-content/original_images/twg_creators_connect_hero.png')", minHeight:"100vh"}} className="">
      <Head>
        <title>Creators Connect</title>
        <meta name="description" content="deFi Home Page" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Tangerine"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
          crossorigin="anonymous"
        />
      </Head>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
        crossorigin="anonymous"
      ></script>
      <Header />
      <div className="p-0 m-0">
        {/* {isWeb3Enabled ? ( */}
        {true ? (
          isAuthenticated ? (
            <div style={{minHeight:"70vh"}}>{children}</div>
          ) : (
            <div
              className="p-4 m-0 text-light text-center  "
              style={{ minHeight: "70vh" }}
              // style={{ marginTop: "-5rem", zIndex: "1" }}
            >
              <h1>Please connect to wallet.</h1>
              <p>
              <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">Click here</a> to install.
              </p>
            </div>
          )
        ) : (
          <div
            className="p-4 m-0 text-light text-center  "
            style={{ minHeight: "70vh" }}
            // style={{ marginTop: "-5rem", zIndex: "1" }}
          >
            <h1>Metamask is not installed in your browser.</h1>
            <p>
              <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">Click here</a> to install.
            </p>
          </div>
        )}
      </div>
      <Footer />
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </symbol>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>
      <div
        id="alert-failure"
        className="alert alert-danger d-flex align-items-center d-none"
        role="alert"
      >
        <svg
          className="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Danger:"
        >
          <use xlinkHref="#exclamation-triangle-fill" />
        </svg>
        <div id="alert-failure-msg">An example danger alert with an icon</div>
      </div>
      <div
        id="alert-success"
        className="alert alert-success d-flex align-items-center d-none"
        role="alert"
      >
        <svg
          className="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Success:"
        >
          <use xlinkHref="#check-circle-fill" />
        </svg>
        <div id="alert-success-msg">An example success alert with an icon</div>
      </div>
    </div>
  );
}
