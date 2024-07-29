import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";

interface IState {
  pets: any[];
  petDetails: {}
}

const initialState: IState = {
  pets: [],
  petDetails: {}
};

export const createPetslice = createSlice({
  name: "PET_ACTIONS",
  initialState,
  reducers: {
    getpets: (state: IState, action: PayloadAction<any>) => {
      state.pets = action.payload;
    },
    getpetById: (state: IState, action: PayloadAction<any>) => {
      state.petDetails = action.payload;
    },
  },
});

export const { getpets, getpetById } =
  createPetslice.actions;

export const selectPets = (state: RootState) => state.petSlice;

export default createPetslice.reducer;
