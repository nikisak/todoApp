import React from "react";
import { Todo } from "../todo/todo";
import { AddTodo } from "../add-todo/add-todo";
import "../../App.css";

export const MainTodo = (props) => {

  const populateToDo = () => {
    let tmpTasks = [...props.user.tasks];
    if(props.user.tasks.length === 0) return;
    let pendingTasks = tmpTasks.filter( task => !task.completed );
    let completedTasks = tmpTasks.filter( task => task.completed);
   
    tmpTasks = [...pendingTasks,...completedTasks];
    return tmpTasks.map( task => (
      <Todo key={task.datetime} todo={task} handleTODO={props.handleTODO}/>
    ))
  }

  return (
    <div className="app">
      <div className="panel">
        <div className="panel panel-heading">
          &nbsp;Hi <b>{props.user.name}!</b> ,
          Add tasks to your TODO list
          <span className="logout-btn" onClick={props.handleLogout}>Logout</span>
        </div>
        <AddTodo add={props.handleTODO}/>
        {(props.error !== "") ? <div className="error msg">{props.error}</div> : null}
        <div className="todoCollection">
          {(props.user.tasks.length === 0) ? <h6 className="text-center">You have no TODOs right now</h6> : populateToDo()}
        </div>
      </div>
    </div>
  );
}


