import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./Components/Auth";
import ToDo from "./Components/ToDo";
import { addToken, removeToken } from "./redux/reducers/authReducer";

const App = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("react_redux_toolkit_todo_app_token")) {
      dispatch(addToken());
    }
  }, []);
  return (
    <>
      <div>
        {token === "" ? (
          <Auth />
        ) : (
          <>
            <ToDo />
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
              }}
            >
              <button
                className="btn"
                onClick={() => {
                  dispatch(removeToken());
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
