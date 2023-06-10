import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../translation/translationSlice";
import personReducer from "../form/personSlice";
import localStorageMiddleware from "../form/Middleware";
import HeaderReducer from "../components/headerSlice";
const persistedState: any = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState") || "")
  : {};

export const store = configureStore({
  reducer: {
    language: languageReducer,
    persons: personReducer,
    header: HeaderReducer,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(localStorageMiddleware),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveToLocalStorage),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
