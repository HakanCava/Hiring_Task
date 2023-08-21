import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// import { Icon } from "next/dist/lib/metadata/types/metadata-types";

interface LocationState {
  latitude: string;
  longitude: string;
  placeName: string;
  placeInfo: string;
  marker: string;
}

const initialState: LocationState = {
  latitude: "", //! enlem
  longitude: "", //! boylam
  placeName: "",
  placeInfo: "",
  marker: "",
};

export const LocateSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<LocationState>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.placeName = action.payload.placeName;
      state.placeInfo = action.payload.placeInfo;
      state.marker = action.payload.marker;
    },
  },
});

export const { addLocation } = LocateSlice.actions;

export default LocateSlice.reducer;
