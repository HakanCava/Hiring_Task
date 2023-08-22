import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// import { Icon } from "next/dist/lib/metadata/types/metadata-types";

interface Locate {
  id: number | string;
  lat: number; //! enlem
  lng: number; //! boylam
  placeName: string;
  placeInfo:string;
  marker: string;
}

interface LocationState {
  locations: Locate[];
}

const initialState: LocationState = {
  locations: [],
};

export const LocateSlice = createSlice({
  name: "locate",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Locate>) => {
      console.log(action.payload);
      state.locations = [...state.locations, action.payload];
    },
  },
});

export const { addLocation } = LocateSlice.actions;
// export const selectLocation = (state: RootState) => state.locate.locations

export default LocateSlice.reducer;


