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

    },
    resetResearch: (state) => {
      state.value = "";
    },

  },
});

export const { storeResearch, resetResearch } = listSlice.actions;
export default listSlice.reducer;

//enregistrer la string en entrée pour la recherche & reset la recherche