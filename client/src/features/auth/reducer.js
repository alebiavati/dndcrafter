import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';

const initialState = { user: { loggedIn: false } };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

const selectSelf = (state) => state.auth;

export const selectUser = createDraftSafeSelector(
  selectSelf,
  (state) => state.user
);

export const selectUserAddress = createDraftSafeSelector(
  selectSelf,
  (state) => state.user?.addr
);

export default authSlice.reducer;
