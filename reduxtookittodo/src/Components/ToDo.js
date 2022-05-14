import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  deletetodo,
  getallTodos,
} from "../redux/reducers/todoReducer";

const ToDo = () => {
  const { user, todos } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [newtodo, setnewtodo] = useState("");

  useEffect(() => {
    dispatch(getallTodos(user.token));
  }, []);
  //   console.log(todos);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {todos.loading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <>
          {todos.error && <h4>{todos.error}</h4>}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              value={newtodo}
              onChange={(e) => setnewtodo(e.target.value)}
            />
            <button
              className="btn"
              onClick={() => {
                if (newtodo !== "") {
                  dispatch(createTodo({ token: user.token, todo: newtodo }));
                }
              }}
            >
              Create
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {todos.alltodos.map((item) => {
              const { todo, todoBy, _id } = item;
              return (
                <div
                  key={_id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4 style={{ width: "500px" }}>{todo}</h4>
                  <button
                    className="btn"
                    style={{ backgroundColor: "red" }}
                    onClick={() => {
                      dispatch(deletetodo({ token: user.token, id: _id }));
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ToDo;
