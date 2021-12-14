import {
  CREATE_TODO,
  REMOVE_TODO,
  MARK_TODO_AS_COMPLETED,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
  GET_SERVERDATA_SUCCESS,
  GET_SERVERDATA_FAILURE,
} from "../todos/actions";

//==========( ISLOADING )

export const isLoading = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case LOAD_TODOS_IN_PROGRESS: {
      return true;
    }
    case LOAD_TODOS_SUCCESS: {
      return false;
    }
    case LOAD_TODOS_FAILURE: {
      return false;
    }
    default:
      return state;
  }
};

//==========( TODOS )

export const todos = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { text } = payload;
      const newTodo = {
        text,
        isCompleted: false,
      };
      return state.concat(newTodo);
    }

    case REMOVE_TODO: {
      const { text } = payload;
      return state.filter((todo) => todo.text !== text);
    }

    case MARK_TODO_AS_COMPLETED: {
      const { text } = payload;
      console.log("todo", state);
      return state.map((todo) => {
        if (todo.text === text) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
    }

    default: {
      return state;
    }
  }
};

//==========( SERVERDATA )

export const serverData = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVERDATA_SUCCESS: {
      console.log("success:", payload);
      return { ...state, studentData: payload };
    }
    case GET_SERVERDATA_FAILURE: {
      return state;
    }
    default:
      return state;
  }
};

/*
NOTES:
 A reducer is a function that is named after a resource in the redux store that it is in charge of managing.
 it takes current state and the action that was triggered and decides what changes should take place in state
 and return updated state.
 You would normaly use a switch block to determine action.
 !When working with reducers it is important not to mutate state in any way!
 Return state as a default if no changes are made to state.
*/
