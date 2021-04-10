import { configureStore } from "@reduxjs/toolkit";
import profile from "./features/profile/reducer";
import auth from "./features/auth/reducer";
import balance from "./features/balance/reducer";

export default configureStore({
  reducer: {
    profile,
    auth,
    balance,
  },
});
