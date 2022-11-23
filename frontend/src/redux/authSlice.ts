import { createSlice } from "@reduxjs/toolkit";
import { hvbApi } from "../api/index.js";

type AuthSliceState = { isAuthenticated: boolean; token: null | string };

const initialState: AuthSliceState = {
  isAuthenticated: false,
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjOWM3MGMyYy1jYTM2LTQ5OGMtOTFlNC1kNTFiNjdmM2MxZGQiLCJpYXQiOjE2NjgyNDg2MTczMjl9.tboZe5JCWr7aBZ-5Sz2YFXHj8JTZnHGuz6DfNgLeAERgGZPxxwkMN9_O8app8hwJVm4RQ1T4_LfLhCpeHsArxTU1YAXZERPR2CzeBkMHasn33X3zltjTgY_F7d8ekYz4AZpwxxYecAcw1Ic9voHtghC3zkb9emb_3-NevLZgyOgIGeeAd1Ed0svgmq3fuA2gJ5zHz6zXCSnx7TV8lop1yctFOH8JD1xg99BtejdKOqOLV_WmT6lKoFqi0tQOUT6gNPaksmuJWsQlrEKKRHcPXtmz3IMrZVIXeDMHVqbcymGvEGpmRcFtVD8JvG1QpMDg8xgjVuM4gfr3Tw1BvsZejZp-5aNT4-kvchTVh7oOTkp3y27Ui8LF0zLbeGt1dZGSOyKAlwEyvbMiT5KXaBHsYxRkEIjhxNBCggtcMQaLOHj94upAjjp-Qvza4LJYcoXkiVU2c3ge14qOJjytT5rDvIxE2b58y77ehMnBI2LdmUBb9oFsQz3ba0meuBiQ2I-NfOlNy8uQyvTP5EPwQgYbcbLtB2im5-R3qVCeiRhs25WADL7XP418_-wdUN6gvYVOP4JvLaJudAFdXJqXasyBLlVBhVGzMVeadLvzMLogGlgyG0N-MfbHfM4NzWPlLTYUCrNCrEn-YDhiIPJMn2AUc7FrUFF8edtjv-S0G3eTm6s",
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
