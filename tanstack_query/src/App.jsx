import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home";
import { FetchOld } from "./Pages/FetchOld";
import { FetchRQ } from "./Pages/FetchRQ";
import { MainLayout } from "./Components/Layout/MainLayOut";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      },
    ],
  },
]);

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}> </RouterProvider>
    </QueryClientProvider>
  );
};

export default App;
