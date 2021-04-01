import { configureStore } from "@reduxjs/toolkit";
import profile from "./features/profile/reducer";
import auth from "./features/auth/reducer";
import gold from "./features/gold/reducer";

export default configureStore({
  reducer: { profile, auth, gold },
});
