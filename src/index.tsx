import { ApolloProvider } from "@apollo/client";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { client } from "./apollo";
import "./styles/styles.css";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./components/app";

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
