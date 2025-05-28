import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import authSlice from "./features/auth/authSlice";
import categorySlice from "./features/category/categorySlice";
import layoutSlice from "./features/layout/layoutSlice";
import menuSlice from "./features/menu/menuSlice";
import notificationSlice from "./features/notification/notificationSlice";
import otpSlice from "./features/otp/otpSlice";
import restaurantSlice from "./features/restaurant/restaurantSlice";
import tableSlice from "./features/table/tableSlice";
import walletSlice from "./features/wallet/walletSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    otp: otpSlice,
    layout: layoutSlice,
    menu: menuSlice,
    table: tableSlice,
    notification: notificationSlice,
    restaurant: restaurantSlice,
    wallet: walletSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
