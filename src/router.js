import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "@/routes/Home.jsx";
import About from "@/routes/About.jsx";
import NotFound from "@/routes/NotFound.jsx";
import Recipes from "@/routes/Recipes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
        },
      
      {
        path: "/recipes",
        Component: Recipes,
      },
      {
        path: "/*",
        Component: NotFound,
      },
    ],
  },
]);
export default router;
