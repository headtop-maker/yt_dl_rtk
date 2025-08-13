import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dlReducer from './dlSlice';

import { persistStore } from 'redux-persist';

const reducers = combineReducers({
  dlStore: dlReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;

export type AppDispatch = typeof store.dispatch;
