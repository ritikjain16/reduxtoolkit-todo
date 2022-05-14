import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinUser, signupUser } from "../redux/reducers/authReducer";
const Auth = () => {
  const { loading, token, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setauth] = useState("Sign In");

  const authenticate = () => {
    if (auth === "Sign In") {
      dispatch(signinUser({ email, password }));
    } else {
      dispatch(signupUser({ email, password }));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Please {auth}!</h1>
        {loading && (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        )}
        {error && <h4>{error}</h4>}
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter Password"
        />
        {auth === "Sign In" ? (
          <h6
            style={{ cursor: "pointer" }}
            onClick={() => {
              setauth("Sign Up");
            }}
          >
            Don't have an account?
          </h6>
        ) : (
          <h6
            style={{ cursor: "pointer" }}
            onClick={() => {
              setauth("Sign In");
            }}
          >
            Already registered?
          </h6>
        )}
        <button
          className="btn"
          onClick={() => {
            authenticate();
          }}
        >
          {auth}
        </button>
      </div>
    </div>
  );
};

export default Auth;
