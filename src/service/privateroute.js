import React from "react";
import { Redirect, Route } from "react-router-dom";

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

export const CustomerRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("User Role") === "Customer" ? (
          renderMergedProps(component, props, rest)
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export const AdminRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("User Role")==="Admin" ? (
          renderMergedProps(component, props, rest)
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export const PublicRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !localStorage.getItem("User Role") ||
          localStorage.getItem("User Role") === "Customer" ? (
          renderMergedProps(component, props, rest)
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};