import { createStore,applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(reducers,{},applyMiddleware(ReduxThunk));

  if (module.hot) {
    // console.log("in module.hot");
    console.log(reducers);
    module.hot.accept( () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer)
    });
  }
    return store;
}