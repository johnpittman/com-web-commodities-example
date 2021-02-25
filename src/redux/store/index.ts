import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';

function createRootReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    _auth: () => {
      return null;
    },
    ...injectedReducers
  });

  return rootReducer;
}

const store = configureStore({
  reducer: createRootReducer(),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
  devTools: import.meta.env.MODE !== 'production',
  preloadedState: {},
  enhancers: [
    createInjectorsEnhancer({
      createReducer: createRootReducer,
      runSaga: () => {}
    })
  ]
});

export default store;
