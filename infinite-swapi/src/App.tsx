import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";

const rqClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={rqClient}>
      <div className='App'>
        <h1>Infinite SWAPI</h1>
        {/* <InfinitePeople /> */}
        <InfiniteSpecies />
      </div>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
