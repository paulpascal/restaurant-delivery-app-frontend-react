import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Category } from "../pages/client/category";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { UserRole } from "../__generated__/globalTypes";
import { Restaurant } from "../pages/client/restaurant";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { AddRestaurant } from "../pages/owner/add-restaurant";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import { AddDish } from "../pages/owner/add-dish";
import { Order } from "../pages/order";
import { Dashboard } from "../pages/driver/dashboard";

const clientRoutes = [
  {
    path: "/",
    component: <Restaurants />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/category/:slug",
    component: <Category />,
  },
  {
    path: "/restaurants/:id",
    component: <Restaurant />,
  },
];

const restaurantRoutes = [
  { path: "/restaurants", component: <MyRestaurants /> },
  { path: "/restaurants/:id", component: <MyRestaurant /> },
  { path: "/add-restaurant", component: <AddRestaurant /> },
  { path: "/", component: <Restaurants /> },
  { path: "/restaurants/:restaurantId/add-dish", component: <AddDish /> },
];

const commonRoutes = [
  { path: "/confirm", component: <ConfirmEmail /> },
  { path: "/edit-profile", component: <EditProfile /> },
  { path: "/orders/:id", component: <Order /> },
];

const driverRoutes = [{ path: "/", component: <Dashboard /> }];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  console.log(data);
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === UserRole.Client &&
          clientRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Owner &&
          restaurantRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Delivery &&
          driverRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map((route) => (
          <Route key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
