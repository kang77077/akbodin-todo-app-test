import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export default function configureStore() {
  const composeEnhancers = compose;
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}