import React, { useState } from "react";
import { connect } from "react-redux";
import { createTodo } from "../../store/todos/actions";

const NewTodoForm = ({ todos, onCreatePressed, state }) => {
  //==========( LOGIC )

  const [inputValue, setInputValue] = useState("");

  //==========( CONTENT )

  return (
    <React.Fragment>
      <div className="new-todo-form">
        <input
          className="new-todo-input"
          type="text"
          placeholder="Type your new todo here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="new-todo-button"
          onClick={() => {
            const isDuplicateText = todos.some(
              (todo) => todo.text === inputValue
            );
            if (!isDuplicateText) {
              onCreatePressed(inputValue);
              setInputValue("");
            }
          }}
        >
          Create Todo
        </button>
      </div>
    </React.Fragment>
  );
};

//==========( REDUX )

const mapStateToProps = (state) => ({
  todos: state.todos,
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  onCreatePressed: (text) => dispatch(createTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);

/*
NOTES: 
Because mapStateToProps and mapDispatchToProps are passed to connect on export. These are passed to props.
"mapDispatchToProps" functions allow a component to trigger actions that the redux store will respond to.
"mapStateToProps" represents entire redux state

When connecting components:
if mapStateToProps is not needed to pass then connect(null,mapDispatchToProps)
if mapStateToProps is only needed to pass then connect(mapStateToProps)
*/
