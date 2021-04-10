import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { selectUserAddress, setUser } from "../auth/reducer";
import { fetchBalanceScript } from "./flow/fetch-balance.script";
import { initGoldTx } from "./flow/init-gold.tx";
import { isGoldInitializedScript } from "./flow/is-gold-initialized.script";

const getBalance = async (address) => {
  const balance = await fetchBalanceScript(address);
  return Math.round(balance);
};

export const fetchBalance = createAsyncThunk(
  "balance/fetch",
  async (_, thunk) => {
    const address = selectUserAddress(thunk.getState());
    const initialized = await isGoldInitializedScript(address);
    if (!initialized) {
      return "you don't have a vault!";
    }
    return await getBalance(address);
  }
);

export const setupVault = createAsyncThunk(
  "balance/setupVault",
  async (_, thunk) => {
    const address = selectUserAddress(thunk.getState());
    const initialized = await isGoldInitializedScript(address);
    if (!initialized) {
      await initGoldTx();
    }
    return await getBalance(address);
  }
);

const initialState = {
  status: "idle",
  statusVault: "idle",
  loadCount: 0,
  balance: null,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBalance.pending, (state) => {
      state.status = "pending";
      state.error = undefined;
    });
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
      state.status = "loaded";
      state.loadCount += 1;
      state.error = undefined;
    });
    builder.addCase(fetchBalance.rejected, (state, action) => {
      state.balance = 0;
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(setupVault.pending, (state) => {
      state.statusVault = "pending";
      state.error = undefined;
    });
    builder.addCase(setupVault.fulfilled, (state, action) => {
      state.balance = action.payload;
      state.statusVault = "loaded";
      state.error = undefined;
    });
    builder.addCase(setupVault.rejected, (state, action) => {
      state.balance = 0;
      state.statusVault = "error";
      state.error = action.error.message;
    });
    builder.addCase(setUser, (state) => {
      state.balance = null;
    });
  },
});

const selectSelf = (state) => state.balance;

export const selectBalance = createDraftSafeSelector(
  selectSelf,
  (state) => state.balance
);

export const selectBalanceLoading = createDraftSafeSelector(
  selectSelf,
  (state) =>
    state.status === "idle" || (!state.loadCount && state.status === "loading")
);

export const selectSettingUpVault = createDraftSafeSelector(
  selectSelf,
  (state) => state.statusVault === "loading"
);

export default balanceSlice.reducer;
