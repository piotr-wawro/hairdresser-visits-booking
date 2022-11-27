import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { hvbApi } from "../api/index.js";

type AuthSliceState = { isAuthenticated: boolean; token: null | string };

const initialState: AuthSliceState = {
  isAuthenticated: false,
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzRkYzc5OC05NjA4LTQwNWUtOGU5NS05NDA5NWQ5MWZiNzMiLCJpYXQiOjE2NjgyNDg2MzA4NTR9.WYp8g1_FApoEiPAMggsSsvyLr9_XJF4Wmdv5jnP9w3MeGHbhIdkUI0FmOpxfVAfc7cVUQPQAZjVplqoZ6OBmKDVbTpFW8QOGzDIc3z9t5PtRD2as5rOFQ-OTaDYB6yI8vAfFlT_z42cij5bCOu8kC7wrM5lUcW8yaDeuU_EfYkeQk2B3RYsueBq8Jj4VNedPwYKqhqP-bDpLhyZ5jaRmBkQtlEWjm26ZfeVqqBchZPK7h4CmQiW9BZHOnAV43alJqeJpOIzygu6STp67kpL6H9DblMl_N4LC7LyyR_kR9PZznXicQhDhBnJK62ZZVmhFtWBZl1QSZwfo-Mhdw2JkcnfogfWdqIh0wQpWuTnySIaXMK4LXPD7k1nufCA0uK2TfTr1oxbembSoO1Kc8GZDojMSbAUB3wW-Qhrt4_27cav0HhSm2m1fwwmwFpkR0inNROHx1c1FXSeKmSotZG7yGr3L4bZb_BDyMr7ESMuhwMTI6RYp2oUtahxDHzu6v6gOQAmWoVbUJQFTWMolydxmCwcO7KmOXB-5wAlpWYQStiAQ-J2q3CcpiaoMIEI6OrUYrrJi113elE9ayIuDqIGure3aP-tGOQx7e2CaF2XcTms8WR1p6p3WjiLOdlGfQsFmAofZpA6qZK0UOMLPPS0a3-WDWhZ1UZd8oGfSXm64TaM",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
