//==========( ACTIONS )

export const CREATE_TODO = "CREATE_TODO";
export const createTodo = (text) => ({
  type: CREATE_TODO,
  payload: { text },
});

export const REMOVE_TODO = "REMOVE_TODO";
export const removeTodo = (text) => ({
  type: REMOVE_TODO,
  payload: { text },
});

export const MARK_TODO_AS_COMPLETED = "MARK_TODO_AS_COMPLETED";
export const markTodoAsCompleted = (text) => ({
  type: MARK_TODO_AS_COMPLETED,
  payload: { text },
});

//==========( THUNKS )

export const LOAD_TODOS_IN_PROGRESS = "LOAD_TODOS_IN_PROGRESS";
export const loadTodosInProgress = () => ({
  type: LOAD_TODOS_IN_PROGRESS,
});

export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS";
export const loadTodosSuccess = (todo) => ({
  type: LOAD_TODOS_SUCCESS,
  payload: { todo },
});

export const LOAD_TODOS_FAILURE = "LOAD_TODOS_FAILURE";
export const loadTodosFailure = () => ({
  type: LOAD_TODOS_FAILURE,
});

export const GET_SERVERDATA_SUCCESS = "GET_SERVERDATA_SUCCESS";
export const getServerDataSuccess = (response) => ({
  type: GET_SERVERDATA_SUCCESS,
  payload: response,
});

export const GET_SERVERDATA_FAILURE = "GET_SERVERDATA_FAILURE";
export const getServerDataFailure = () => ({
  type: GET_SERVERDATA_FAILURE,
});
