import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./login.css";

export const Login = (props) => {
  const [user, setUser] = useState({ name: "", password: "" });

  const handleKeyUp = (event) => {
    let tmpState = { ...user };
    tmpState[event.target.name] = event.target.value;
    setUser(tmpState);
  };

  const shouldDisable = () => user.name === "" || user.password === "";

  return (
    <div className="logincontainer">
      <div className="panel">
        <div className="panel panel-heading">
          <i className="fa fa-user-circle"></i>&nbsp;Login in to Do More!
        </div>
      </div>
      <form>
        <InputGroup className="mb-3 logininput">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <i className="fa fa-user-o"></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onKeyUp={handleKeyUp}
            name="name"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3 logininput">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <i className="fa fa-lock"></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onKeyUp={handleKeyUp}
            name="password"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            type="password"
          />
        </InputGroup>
        <div className="error msg">{props.error}</div>
        <div className="success msg">{props.success}</div>
        <div className="buttonContainer">
          <Button
            className="loginbutton"
            variant="outline-primary"
            onClick={() => props.handleLogin(user)}
            disabled={shouldDisable()}
          >
            Login
          </Button>
          <Button
            className="loginbutton"
            variant="outline-primary"
            onClick={() => props.handleRegister(user)}
            disabled={shouldDisable()}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
