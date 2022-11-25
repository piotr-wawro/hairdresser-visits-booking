import { createSlice } from "@reduxjs/toolkit";
import { hvbApi } from "../api/index.js";

type AuthSliceState = { isAuthenticated: boolean; token: null | string };

const initialState: AuthSliceState = {
  isAuthenticated: false,
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzJjZmYzOC04ODEzLTQ4ZGEtOWRmMC0xZmUzYTgzMjg3ZTgiLCJpYXQiOjE2NjgyNDg2NzY3MDZ9.LtvIYBqlEBdHmS_-ezsNodGiG4zRMTvN9K3TQAxumkQGlI2MWUY42ApXgaazN6up1XRYkRD_nj1VSH7YnEbMXqFTH-s3dlM0aMEBWBmFc-iYo469smpTlLuvJ1IN8qJZ5INoOedt_XRNoidVaKssQ2O_aCprOSCvPzW7HWvn_bpdrMZ_Fnccj8hzsZ4BdeTSwZzayySN5epexHZm8aaoXdjCnw4YsT6AurkOsxeiROyjL0zQo1Y4sNp713vORia5DYbAFmdyJAgtTfjhxPfE6pL_e7CDL9ULY4T57v3QXF0dOmA0BXoI9GeutvK_5bIsy3JRh3zNrQczE0pjPKBf6P1irkNhxF13BtotRTiEbxhfwwQG-f_Ypc_BQXS4HGvLLVKqsUDRtgntqfBtAze9Ms56qncdkAKvCW4aneWn5WRHi6BemD4ixqITjx4l8jwyBdNy-J10LNifupcrD0PdGd0wa_N1NQQO-Nwe4WxH3TxBo6E26dx6Dz6_Zs9LZ5PH4Cvu2OPtN56WPkXDj8ecjNcl45WEPc-Z-d2GK-yZuHwwFJ7_zjs8G07kOp-wbIphKyrFXxqfyCdvwD-QUjtlGkoKOiwA43xWm9naJe1lFaY_5kyHcHOajvgZM4MDNvlXlKtqBjFPr_HBIw4nn0jkqJrtRNNoR_yuT8jlM_OmtGg",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loadToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { loadToken, logout } = authSlice.actions;
