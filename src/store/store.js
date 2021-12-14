import { createStore, combineReducers, applyMiddleware } from "redux";
import { todos, isLoading, serverData } from "./utils/reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = {
  todos,
  isLoading,
  serverData,
};

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () =>
  createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

/*
NOTES:
"stateReconciler: autoMergeLevel2," tells redux how reconcile initial and stored states of the aplication "how deep should it go".
Root reducer: places reducers in a form that can pass to the create store function that was created.
persistConfig used to keep the changes to state when a browser is refreshed.
*/
