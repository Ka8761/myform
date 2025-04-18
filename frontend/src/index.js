import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//import { ClerkProvider } from "@clerk/clerk-react";
//pk_test_aW1tZW5zZS1zZWFsLTM4LmNsZXJrLmFjY291bnRzLmRldiQ
//const clerkFrontendApi = "pk_test_aW1tZW5zZS1zZWFsLTM4LmNsZXJrLmFjY291bnRzLmRldiQ"; // Replace with actual key
const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <App/>
);
