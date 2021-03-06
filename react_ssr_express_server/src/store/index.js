import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as headerReducer } from "../components/Header/store";
import { reducer as homeReducer } from "../containers/Home/store";
import { reducer as bookReducer } from "../containers/Book/store";
import { instance as clientAxios } from '../client/request'
import { createInstance as serverAxios } from '../server/request'

const reducer = combineReducers({
    header: headerReducer,
    home: homeReducer,
    book: bookReducer,
});

export const getStore = (req) => {
    // 在 actionCreators 里面，store.dispatch 使用的是对应的服务器或者是客户端的 store
    // 因此可以使用 redux-thunk 中间件额外传入的参数
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))));
};

export const getClientStore = () => {
    const defaultState = window.context.state
    return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}
