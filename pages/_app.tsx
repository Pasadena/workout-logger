import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import AppLayout from "layouts/default";
import { useApollo } from "apollo/client";

export function reportWebVitals(metric) {
  console.log("Metrics", metric);
}

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ApolloProvider>
  );
}

export default MyApp;
