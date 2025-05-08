import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface BookmakerState {
  titles: string[];
}

const initialState: BookmakerState = {
  titles: [],
};

const bookmakerSlice = createSlice({
  name: 'bookmaker',
  initialState,
  reducers: {
    setBookmakerTitles: (state, action: PayloadAction<string[]>) => {
      state.titles = action.payload;
    },
  },
});

export const { setBookmakerTitles } = bookmakerSlice.actions;
export default bookmakerSlice.reducer;
