import { Container } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import HeaderComponent from "./components/header";
import {
  ADMIN_PANEL_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  HOME_ROUTE,
  INFO_ROUTE,
  LOGIN_ROUTE,
  SIGNIN_ROUTE,
} from "./constant/routes";
import Admin from "./pages/admin";
import AdminPanel from "./pages/adminPanel";
import Basket from "./pages/basket";
import Home from "./pages/home";
import Information from "./pages/information";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import SignIn from "./pages/signIn";
import { STORAGE_ADMIN_LOGIN } from "./constant";
import withPrivateRoute from "./components/HOC/privateRouteHOC";

function App() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname.includes(LOGIN_ROUTE) ||
    location.pathname.includes(SIGNIN_ROUTE);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {!isAuthRoute && <HeaderComponent />}
      <div className="pt-7 w-full">
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={BASKET_ROUTE} element={<Basket />} />
          <Route path={LOGIN_ROUTE} element={<Login />}>
            <Route path={ADMIN_ROUTE} element={<Admin />} />
          </Route>
          <Route path={SIGNIN_ROUTE} element={<SignIn />} />
          <Route path={INFO_ROUTE} element={<Information />} />
          <Route
            path={ADMIN_PANEL_ROUTE}
            element={withPrivateRoute(AdminPanel)}
          />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
    </Container>
  );
}

export default App;
