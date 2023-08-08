import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversation: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { setConversation } = conversationSlice.actions;
export default conversationSlice.reducer;