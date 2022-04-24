import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "../reducers/users"

const configureStore = () => {
    const store = createStore(combineReducers({
        user: rootReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore