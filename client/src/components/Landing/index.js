import React from "react";
import { Redirect } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../constants";
export default () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  if (!accessToken)
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
    else return (
      <Redirect
        to={{
          pathname: "/dashboard",
        }}
      />
    );
};
