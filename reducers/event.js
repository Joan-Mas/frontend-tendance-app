import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.value = action.payload;
    },
    resetEvent: (state, action) => {
      state.value = {};
    },

  },
});

export const { setEvent,resetEvent } = eventSlice.actions;
export default eventSlice.reducer;