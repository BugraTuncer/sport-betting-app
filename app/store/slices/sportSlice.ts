import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SportState {
  selectedSport: string;
}

const initialState: SportState = {
  selectedSport: 'Soccer',
};

const sportSlice = createSlice({
  name: 'sport',
  initialState,
  reducers: {
    setSelectedSport: (state, action: PayloadAction<string>) => {
      state.selectedSport = action.payload;
    },
    clearSelectedSport: (state) => {
      state.selectedSport = 'Soccer';
    },
  },
});

export const { setSelectedSport } = sportSlice.actions;
export default sportSlice.reducer;
