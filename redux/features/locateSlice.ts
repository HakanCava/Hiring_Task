import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



const initialState: LocationState = {
  locations: [],
};

export const LocateSlice = createSlice({
  name: "locate",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Locate>) => {
      console.log("addLocation",action.payload);
      state.locations = [...state.locations, action.payload];
    },
    deleteLocation: (state, action) => {
      console.log("deleteLocation",action.payload);
      state.locations = [...state.locations].filter(
        (loc) => loc.id !== action.payload
      );
    },
  },
});

export const { addLocation, deleteLocation } = LocateSlice.actions;


export default LocateSlice.reducer;
