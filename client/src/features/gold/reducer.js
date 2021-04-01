import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { setUser } from "../auth/reducer";
import { fetchGoldScript } from "./flow/fetch-gold.script";
import { initGoldTx } from "./flow/init-gold.tx";

export const fetchGold = createAsyncThunk("gold/fetch", async (address) => {
  await initGoldTx(address);
  return await fetchGoldScript(address);
});

const initialState = {
  status: "idle",
  loadCount: 0,
  balance: null,
};

const goldSlice = createSlice({
  name: "gold",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGold.pending, (state) => {
      state.status = "pending";
      state.error = undefined;
    });
    builder.addCase(fetchGold.fulfilled, (state, action) => {
      state.balance = action.payload;
      state.status = "loaded";
      state.loadCount += 1;
      state.error = undefined;
    });
    builder.addCase(fetchGold.rejected, (state, action) => {
      state.balance = null;
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(setUser, (state) => {
      state.balance = null;
    });
  },
});

const selectSelf = (state) => state.gold;

export const selectBalance = createDraftSafeSelector(
  selectSelf,
  (state) => state.balance
);

export const selectBalanceLoading = createDraftSafeSelector(
  selectSelf,
  (state) => state.status !== "loaded"
);

export default goldSlice.reducer;
