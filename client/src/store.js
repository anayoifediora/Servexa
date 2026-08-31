import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from './State/searchTermSlice';
import currentPageReducer from './State/currentPageSlice';
import activityFeedReducer from './State/activityFeedSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    currentPage: currentPageReducer,
    activityFeed: activityFeedReducer,
  },
});
