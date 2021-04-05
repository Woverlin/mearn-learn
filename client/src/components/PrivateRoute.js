import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";

// import { selectValue } from "../utils";
// import { acceptRoute } from "../utils/constants";

export default ({ component: Component, auth, render, path, ...rest }) => {
//   const user = useSelector(selectValue(`user`, {}));
//   const profileType = user?.profile?.type?.id ?? 4;
//   const isAccess = (user && user.accessToken && profileType !== 4) || acceptRoute.includes(path);
    const user = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      render={props => {
        return user ? (
          Component ? (
            <Component {...props} {...{ user }} />
          ) : (
            render({ ...props, user })
          )
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};
