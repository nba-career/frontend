import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.token ? (
        <Component {...props} />
      ) : (
        props.history.push("/login")
      )
    }
  />
);

export default PrivateRoute;
