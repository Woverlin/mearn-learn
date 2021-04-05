import React, { useState } from "react";
import baseApi from '../../api';
import "./styles.scss";
export default () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const onChange = ({ target }) => {
    const { name, value } = target;
	console.log("name, value", name, value);
    setLoginForm({ ...loginForm, [name]: value });
  };
  const submit = async() => {
	const res = await baseApi.login(loginForm);
  };
  return (
    <div class="container fluid">
      <div class="d-flex  justify-content-center d-flex ">
        <div class="card">
          <div class="card-header">
            <h3>Sign In</h3>
            <div>
              <div class="card-body">
                <form>
                  <div class="input-group form-group">
                    <div class="input-group-prepend"></div>
                    <input
                      value={loginForm.username}
                      type="text"
                      class="form-control"
                      onChange={onChange}
                      name="username"
                    />
                  </div>
                  <div class="input-group form-group">
                    <div class="input-group-prepend"></div>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="password"
                      value={loginForm.password}
                      onChange={onChange}
                      name="password"
                    />
                  </div>
                  <div class="row align-items-center remember">
                    <input type="checkbox" />
                    Remember Me
                  </div>
                  <div class="form-group">
                    <button
                      type="button"
                      class="btn float-right login_btn btn-primary"
                      onClick={submit}>
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div class="card-footer">
                <div class="d-flex justify-content-center links">
                  Don't have an account?<a href="#">Sign Up</a>
                </div>
                <div class="d-flex justify-content-center">
                  <a href="#">Forgot your password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
