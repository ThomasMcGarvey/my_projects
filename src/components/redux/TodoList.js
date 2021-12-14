import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { removeTodo, markTodoAsCompleted } from "../../store/todos/actions";
import { displayAlert, getStudentProfiles } from "../../store/utils/thunks";

const TodoList = ({
  todos = [],
  onRemovePressed,
  onCompletedPressed,
  isLoading,
  //onDisplayAlertClicked,
  callStudentProfiles,
  state,
}) => {
  //==========( LOGIC )

  useEffect(() => {
    callStudentProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const log = () => {
    console.log("STATE", state);
  };

  const loadingMessage = <div>Loading todos...</div>;

  //==========( CONTENT )

  const content = (
    <div className="container list-wrapper">
      <button onClick={log}>TODOLIST STATE</button>
      <NewTodoForm />
      {todos.map((todo) => (
        <React.Fragment key={`todo${todo.text}`}>
          <TodoListItem
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}
          />
        </React.Fragment>
      ))}
    </div>
  );

  //==========( FINALIZE )

  return isLoading ? loadingMessage : content;
};

//==========( REDUX )

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  todos: state.todos,
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  callStudentProfiles: () => dispatch(getStudentProfiles()),

  onRemovePressed: (text) => dispatch(removeTodo(text)),
  onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text)),
  onDisplayAlertClicked: (text) => dispatch(displayAlert(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
