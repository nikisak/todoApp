import React from "react";
import Button from "react-bootstrap/Button";
import { TODO_ENDPOINTS } from "../../services/environment.const";

export const Todo = (props) => {
  return (
    <div className="todo-list">
      <div>
        {!props.todo.completed ? (
          <span className="content">
            <i className="fa fa-square-o" aria-hidden="true"></i>&nbsp;
            {props.todo.content}
          </span>
        ) : (
          <span className="content">
            <i className="fa fa-check-square-o" aria-hidden="true"></i>
            &nbsp;
            <del>{props.todo.content}</del>
          </span>
        )}
      </div>

      <div>
        <span className="content">
          {new Date(props.todo.datetime).toLocaleDateString()}
        </span>
        &nbsp;&nbsp;
        <Button
          className="buttonIcon"
          onClick={() => props.handleTODO(props.todo, TODO_ENDPOINTS.DELETE)}
        >
          <i className="fa fa-trash"></i>
        </Button>
        &nbsp;
        <Button
          className="buttonIcon"
          onClick={() => props.handleTODO(props.todo, TODO_ENDPOINTS.UPDATE)}
        >
          {props.todo.completed ? (
            <i className="fa fa-close" />
          ) : (
            <i className="fa fa-check" />
          )}
        </Button>
      </div>
    </div>
  );
};
