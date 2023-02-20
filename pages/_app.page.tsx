import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";

import theme from "../theme/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { useEffect, useState } from "react";
import NextHead from "next/head";

import "../styles/nprogress.css";
import Header from "../components/Header";
import "@fontsource/inter/500.css";
import ResponseHandler from "../components/ResponseHandler";
import WalletContext from "../contexts/WalletContext";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <WalletContext>
            <NextHead>
              <title>Transfer App</title>
              <meta
                name="description"
                content="Transfer webapp for wallets compatible with ethereum"
              />
              <link rel="icon" href="/favicon.ico" />
              <meta charSet="UTF-8" />
            </NextHead>
            <Header />
            <Component {...pageProps} />
            <ResponseHandler />
          </WalletContext>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    )
  );
}

export default App;
