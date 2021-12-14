import React from "react";

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => (
  <div className="card">
    <h3>{todo.text}</h3>
    <div className="buttons-container">
      {todo.isCompleted ? null : (
        <button
          onClick={() => onCompletedPressed(todo.text)}
          className="completed-button"
        >
          Mark As Completed
        </button>
      )}
      <button
        onClick={() => onRemovePressed(todo.text)}
        className="remove-button"
      >
        Remove
      </button>
    </div>
  </div>
);

export default TodoListItem;
