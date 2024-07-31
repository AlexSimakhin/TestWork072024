import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as contactsReducer } from './contacts/contacts.slice';

const reducers = combineReducers({
  contacts: contactsReducer
})

export const store = configureStore({
  reducer: reducers
});