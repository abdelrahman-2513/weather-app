import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css"
// Components ----------------------------------------------------------------------------------------------------------------------------

import React, { Suspense } from "react";
import LoadingComponent from "./components/Loading/Loading";

// lazy importing component
const Layout = React.lazy(() => import("./assets/Layout/Layout"))

function App() {
  const query = new QueryClient()
  return (
    <QueryClientProvider client={query}>
      <Suspense fallback={<LoadingComponent />}>

        <Layout />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
