import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SportState {
  selectedSport: string;
}

const initialState: SportState = {
  selectedSport: 'soccer',
};

const sportSlice = createSlice({
  name: 'sport',
  initialState,
  reducers: {
    setSelectedSport: (state, action: PayloadAction<string>) => {
      state.selectedSport = action.payload;
    },
  },
});

export const { setSelectedSport } = sportSlice.actions;
export default sportSlice.reducer;
