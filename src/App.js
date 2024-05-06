import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css"
// Components ----------------------------------------------------------------------------------------------------------------------------
import Layout from "./assets/Layout/Layout";


function App() {
  const query = new QueryClient()
  return (
    <QueryClientProvider client={query}>

      <Layout />
    </QueryClientProvider>
  );
}

export default App;
