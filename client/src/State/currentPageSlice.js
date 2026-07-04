import { createSlice } from '@reduxjs/toolkit';

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState: 1,
  reducers: {
    //Set the current page
    setCurrentPage: (state, action) => action.payload,
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
