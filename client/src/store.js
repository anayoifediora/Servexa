import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from './State/searchTermSlice';
import currentPageReducer from './State/currentPageSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    currentPage: currentPageReducer,
  },
});
