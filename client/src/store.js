import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from './State/searchTermSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
  },
});
