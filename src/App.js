import React, { useState } from "react";
import "./App.css";
import { Login } from "./components/login/login";
import { loginUser, registerUser } from "./services/user.services";
import { updateTODO } from "./services/todo.services";
import { MainTodo } from "./components/main-todo/main-todo";
import { TODO_ENDPOINTS } from "./services/environment.const";

const App = () => {
  const [state, setState] = useState({
    user: {},
    error: "",
    success: "",
  });

  const handleRegister = (user) => {
    let tmpState = { ...state };

    registerUser(user).then((data) => {
      tmpState.error = "";
      tmpState.success = "";
      if (data.success) {
        tmpState.success = data.message;
      } else {
        tmpState.error = data.message;
      }
      setState(tmpState);
    });
  };

  const handleLogin = (user) => {
    let tmpState = { ...state };

    loginUser(user).then((data) => {
      tmpState.error = "";
      tmpState.success = "";
      if (data.success) {
        tmpState.user = data.data;
        tmpState.user.loggedIn = data.success;
      } else {
        tmpState.error = data.message;
      }
      setState(tmpState);
    });
  };

  const isLoggedIn = () => (state.user.loggedIn ? true : false);

  const handleLogout = () => {
    setState({
      user: {},
      error: "",
      success: "",
    });
  };

  const handleToDo = (todo, endpoint) => {
    let tmpState = { ...state };
    let payload = { name: state.user.name };
    if (endpoint === TODO_ENDPOINTS.ADD) {
      payload.task = {
        content: todo,
        completed: false,
        datetime: new Date().getTime(),
      };
    } else if (endpoint === TODO_ENDPOINTS.UPDATE) {
      payload.task = todo;
      payload.task.completed = !payload.task.completed;
    } else if (endpoint === TODO_ENDPOINTS.DELETE) {
      payload.task = todo;
    }

    updateTODO(payload, endpoint).then((data) => {
      tmpState.error = "";
      tmpState.success = "";
      if (data.success) {
        tmpState.user.tasks = data.data;
        tmpState.success = data.message;
      } else {
        tmpState.error = data.message;
      }
      setState(tmpState);
    });
  };

  return isLoggedIn() ? (
    <MainTodo
      user={state.user}
      error={state.error}
      success={state.success}
      handleTODO={handleToDo}
      handleLogout={handleLogout}
    />
  ) : (
    <Login
      error={state.error}
      success={state.success}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
    />
  );
};

export default App;
