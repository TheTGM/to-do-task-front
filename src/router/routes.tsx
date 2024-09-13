import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Task from "../pages/Task/Task";
export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export const privateRoutes = [
  {
    path: "/Task",
    element: <Task />,
  },
];
