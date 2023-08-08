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
   
    // }
  },
});

export const { setEvents, addParticipant,removeParticipant,addInter,removeInter } = eventsSlice.actions;
export default eventsSlice.reducer;
