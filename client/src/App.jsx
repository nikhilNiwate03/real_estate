import Navbar from "./components/navbar/Navbar";
import HomePage from "./routes/homepage/HomePage";
import Layout, { RequireAuth } from "./routes/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/ListPage";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        // {
        //   path: "/profile/update",
        //   element: <ProfileUpdatePage />,
        // },
        // {
        //   path: "/add",
        //   element: <NewPostPage />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
