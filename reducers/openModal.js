import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const openModalSlice = createSlice({
  name: 'openModal',
  initialState,
  reducers: {
    
    setOpenModal:(state, action)=>{
      state.value=action.payload;
    },
   
    // }
  },
});

export const { setOpenModal } = openModalSlice.actions;
export default openModalSlice.reducer;