import { createSlice } from "@reduxjs/toolkit";
import { loginSession, registerUser } from "../actions/session.actions";

interface SessionState {
  loading: boolean;
  session: LoginFormValues | null;
  registerData: RegisterFormValues | null;
  error: object | null | unknown;
}

const initialState: SessionState = {
  loading: false,
  session: null,
  error: null,
  registerData: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginSession.fulfilled, (state, action) => {
      state.session = action.payload;
      state.loading = false;
    });
    builder.addCase(loginSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.registerData = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default sessionSlice.reducer;
