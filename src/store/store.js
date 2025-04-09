// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import authReducer from "../features/auth/authSlice";
import chatsReducer from "../features/chats/chatSlice";

// Persist config for auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

// Persist config for chats
const chatsPersistConfig = {
  key: "chats",
  storage,
  whitelist: ["chats", "currentChat"], // persist these fields
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    chats: persistReducer(chatsPersistConfig, chatsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
