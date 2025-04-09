// src/features/chats/chatsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  currentChat: null,
  loading: false,
  error: null,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats(state, action) {
      state.chats = action.payload;
    },
    addChat(state, action) {
      state.chats.unshift(action.payload);
    },
    updateChat(state, action) {
      const index = state.chats.findIndex(chat => chat.id === action.payload.id);
      if (index !== -1) {
        state.chats[index] = action.payload;
      }
    },
    removeChat(state, action) {
      state.chats = state.chats.filter(chat => chat.id !== action.payload);
    },
    setCurrentChat(state, action) {
      state.currentChat = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetChats(state) {
      state.chats = [];
      state.currentChat = null;
    },
  },
});

export const { 
  setChats, 
  addChat, 
  updateChat, 
  removeChat, 
  setCurrentChat, 
  setLoading, 
  setError,
  resetChats
} = chatsSlice.actions;

export default chatsSlice.reducer;