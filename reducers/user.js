import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => { // A mettre dans la fonction Login
      state.value = action.payload;


    },
    logout: (state, action) => { // A mettre dans la fonction Logout
      state.value = null;
    },


    // ! a verifier si tous marche ok lorquon met en place le backEnds et les logins


     addParticipant :(state, action) =>  {

      // ? cest grace a ce reducer quon va pouvoir savoir si un utilisateur a deja ete interresé par un event ou pas
      state.value.events.partEvents.push(action.payload);
    },
    removeParticipant :(state, action) =>  {
      state.value.events.partEvents.filter(el => el!== action.payload) //? on filtre avec l'id de l'event
    },
    addInter :(state, action) =>  {
   
        state.value.events.interEvents.push(action.payload); 
    },
    removeInter :(state, action) =>  {
        state.value.events.interEvents.filter(el => el!== action.payload) //? on filtre avec l'id de l'event
}

  },
});

export const { login,logout,addParticipant,removeParticipant,addInter,removeInter } = userSlice.actions;
export default userSlice.reducer;