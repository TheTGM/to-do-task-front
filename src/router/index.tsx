import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, routes } from "./routes";
import { useAppSelector } from "../store/hooks";
import Loader from "../components/Loader/Loader";
import PrivateRoute from "./privateRoutes";
import { useEffect } from "react";
import { useSocket } from "../socket/useSocket";

function Router() {
  const { connectSocket } = useSocket();
  const loadingSession = useAppSelector((state) => state.session.loading);
  const loadingTask = useAppSelector((state) => state.task.loading);
  const logged = sessionStorage.getItem("token") as string;
  useEffect(() => {
    if (logged) {
      connectSocket();
    }
    if (logged === undefined) {
      sessionStorage.removeItem("token");
    }
  });
  return (
    <>
      {(loadingSession || loadingTask) && <Loader />}
      <main className="h-screen w-screen overflow-x-hidden relative">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<PrivateRoute logged={logged} />}>
            {privateRoutes.map(({ path, element }) => (
              <Route path={path} element={element} key={path} />
            ))}
          </Route>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </>
  );
}

export default Router;
