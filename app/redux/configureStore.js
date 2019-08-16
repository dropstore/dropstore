import thunkMiddleware from 'redux-thunk';
// eslint-disable-next-line no-unused-vars
import loggerMiddleware from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './reducers';

function configureStore() {
  const middlewares = applyMiddleware(thunkMiddleware);
  // const middlewares = applyMiddleware(thunkMiddleware, loggerMiddleware);
  const store = createStore(persistReducer({
    key: 'root',
    storage: AsyncStorage,
    whitelist: [],
  }, reducers), undefined, compose(middlewares));

  persistStore(store);
  if (__DEV__ && !!window.navigator.userAgent) {
    window.store = store;
  }
  return store;
}

const store = configureStore();

export default store;
