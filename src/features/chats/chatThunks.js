// src/features/chats/chatsThunks.js
import { 
    createChatHistory, 
    getChatHistory, 
    getSingleChatHistory,
    updateChatHistory,
    deleteChatHistory
  } from '../../services/api';
  import { 
    setChats, 
    addChat, 
    updateChat, 
    removeChat, 
    setCurrentChat,
    setLoading, 
    setError 
  } from './chatSlice';
  
  export const fetchChats = () => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const chats = await getChatHistory();
      dispatch(setChats(chats));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const fetchSingleChat = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const chat = await getSingleChatHistory(id);
      dispatch(setCurrentChat(chat));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const createNewChat = (chatData) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const newChat = await createChatHistory(chatData);
      dispatch(addChat(newChat));
      return newChat;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const editChat = (id, chatData) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const updatedChat = await updateChatHistory(id, chatData);
      dispatch(updateChat(updatedChat));
      return updatedChat;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const deleteChat = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      await deleteChatHistory(id);
      dispatch(removeChat(id));
      return id;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };