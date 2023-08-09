import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {

    setEvents:(state, action)=>{
      state.value=action.payload;
    },
    addEvent: (state, action) => {
      state.value.push(action.payload);
    },

  },
});

export const { setEvents, addEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
