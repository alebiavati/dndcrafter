import {
  createAsyncThunk,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { setUser, selectUserAddress } from '../auth/reducer';
import { fetchProfileScript } from './flow/fetch-profile.script';
import { initProfileTx } from './flow/init-profile.tx';
import { isProfileInitializedScript } from './flow/is-profile-initialized.script';
import { setProfileNameTx } from './flow/profile-set-name.tx';

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (address) => {
    const initialized = await isProfileInitializedScript(address);
    if (!initialized) {
      const result = await initProfileTx();
      console.log(result);
    }
    return await fetchProfileScript(address);
  }
);

export const setProfileName = createAsyncThunk(
  'profile/setName',
  async (name, thunk) => {
    await setProfileNameTx(name);
    return await fetchProfileScript(selectUserAddress(thunk.getState()));
  }
);

const initialState = {
  status: 'idle',
  loadCount: 0,
  profile: null,
  updating: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = 'pending';
      state.error = undefined;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = 'loaded';
      state.loadCount += 1;
      state.error = undefined;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.profile = null;
      state.status = 'error';
      state.error = action.error.message;
    });
    builder.addCase(setProfileName.pending, (state) => {
      state.status = 'updating';
    });
    builder.addCase(setProfileName.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.profile = action.payload;
    });
    builder.addCase(setProfileName.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });
    builder.addCase(setUser, (state) => {
      state.profile = null;
    });
  },
});

const selectSelf = (state) => state.profile;

export const selectError = createDraftSafeSelector(
  selectSelf,
  (state) => state.error
);

export const selectProfile = createDraftSafeSelector(
  selectSelf,
  (state) => state.profile
);

export const selectStatus = createDraftSafeSelector(
  selectSelf,
  (state) => state.status
);

export const selectLoadCount = createDraftSafeSelector(
  selectSelf,
  (state) => state.loadCount
);

export const selectProfileUpdating = createDraftSafeSelector(
  selectSelf,
  (state) => state.status === 'updating'
);

export default profileSlice.reducer;
