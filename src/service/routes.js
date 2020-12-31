import React, { Suspense,lazy } from "react";
import { Switch } from "react-router-dom";
import Register from "./../pages/Register/Register";
import Login from "./../pages/Login/Login";
import Checkout from "./../pages/checkout/Checkout";
import OrderSummary from "../pages/orderSummary/OrderSummary";
import Profile from "./../pages/profile/Profile";
import CircularProgress from '@material-ui/core/CircularProgress';
import { CustomerRoute, AdminRoute, PublicRoute } from "./privateroute";
import { LinearProgress } from "@material-ui/core";

const LazyStore = React.lazy(() => {
  return Promise.all([
    import("../pages/Store/Store"),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});
const AsyncDashboard = lazy(()=> import("./../pages/Dashboard/DashboardAdmin"));

function Routes() {
  
  return (
    <Suspense fallback={<div style={{
              display:"flex",
              justifyContent: "center",
              margin:"400px"
            }}><CircularProgress color="secondary" /></div>}>
    <Switch>
      <PublicRoute path="/register" component={Register} />
      <PublicRoute path="/login" component={Login} />
      <CustomerRoute path="/profile" component={Profile} />
      <AdminRoute path="/dashboard" component={AsyncDashboard} />
      <CustomerRoute path="/orderSummary:Summary" component={OrderSummary} />
      <CustomerRoute path="/checkout" component={Checkout} />
      <Suspense
        fallback={
          <div
            style={{
              
             position:"fixed",
             top: "50vh",
             left:"50vw",
             transform: "translate(-50%,-50%)",
            width: 200,
              textAlign:"center",
              fontSize: 30
             
            }}
          >
            <div>Opening store</div>
            <LinearProgress color="secondary" />
          </div>
        }
      >
        <PublicRoute path="/*" component={LazyStore} />
      </Suspense>
     
    </Switch>
    </Suspense>
  );
}

export default Routes;
