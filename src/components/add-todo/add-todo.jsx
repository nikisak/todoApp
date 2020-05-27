import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { TODO_ENDPOINTS } from "../../services/environment.const";

export const AddTodo = (props) => {
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className="add-todo">
      <form>
        <InputGroup className="mb-3">
          <FormControl
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="inputContent"
          />
          <InputGroup.Append>
            <Button
              variant="outline-primary"
              className="addButton"
              onClick={() => props.add(content, TODO_ENDPOINTS.ADD)}
              disabled={content === ""}
            >
              Add
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
    </div>
  );
};
