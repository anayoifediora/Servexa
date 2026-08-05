import { createSlice } from '@reduxjs/toolkit';

const MAX_FEED_ITEMS = 5;

const loadFeed = () => {
  const feed = localStorage.getItem('feed');
  return feed ? JSON.parse(feed) : [];
};

export const activityFeedSlice = createSlice({
  name: 'activityFeed',
  initialState: loadFeed(),
  reducers: {
    //Add items to the feed array
    addToActivityFeed: (state, action) => {
      if (state.length >= MAX_FEED_ITEMS) {
        state.pop();
      }
      state.unshift(action.payload);

      localStorage.setItem('feed', JSON.stringify(state));
    },
  },
});

export const { addToActivityFeed } = activityFeedSlice.actions;

export default activityFeedSlice.reducer;
