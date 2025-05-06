import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BetSlice } from '~/models/bets';

interface BetState {
  basket: BetSlice[];
}

const initialState: BetState = {
  basket: [],
};

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BetSlice>) => {
      state.basket = state.basket.filter((b) => b.eventId !== action.payload.eventId);
      state.basket.push(action.payload);
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      const betToRemove = state.basket.find((b) => b.eventId === action.payload);
      if (betToRemove) {
        state.basket = state.basket.filter((b) => b.eventId !== action.payload);
      }
    },
    clearBasket: (state) => {
      state.basket = [];
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } = betSlice.actions;
export default betSlice.reducer;
