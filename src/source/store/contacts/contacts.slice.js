import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [{name: 'TEST'}]
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.data.push(action.payload)
    }
  }
});

export const {actions, reducer} = contactsSlice;