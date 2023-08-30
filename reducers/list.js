import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "",
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    storeResearch: (state, action) => {
      state.value = action.payload;
      console.log(action.payload);
      console.log("patate!");
    },
    resetResearch: (state) => {
      state.value = "";
    },

  },
});

export const { storeResearch, resetResearch } = listSlice.actions;
export default listSlice.reducer;

//here test