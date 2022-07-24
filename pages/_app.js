import "../styles/globals.css";
import Layout from "../components/Layout";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://fcp4odp0bq7m.usemoralis.com:2053/server"
      appId="SAqIwBrQODGUOaA8cikg3nz64KLmkC2mkG32ZW95"
      initializeOnMount='false'
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>
  );
}

export default MyApp;
