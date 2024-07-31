import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '../api';
import { createLogger } from 'redux-logger';

const logger = createLogger({
    collapsed: true
});

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(logger),
});