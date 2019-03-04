import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import rootReducer from './reducers'
import Reactotron from '../config/reactotron-config'

const sagaMiddleware = createSagaMiddleware();
const composedMiddleware = compose(applyMiddleware(sagaMiddleware))

let store
if (__DEV__) {
  store = Reactotron.createStore(rootReducer, composedMiddleware);
} else {
  store = createStore(rootReducer, composedMiddleware);
}
sagaMiddleware.run(rootSaga);

export default store
