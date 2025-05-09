import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { logAddToBetSlip, logRemoveFromBetSlip } from '~/config/firebase';
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
      logAddToBetSlip({
        bet_id: crypto.randomUUID(),
        match_id: action.payload.eventId,
        odds: action.payload.outcome.price,
        selection: action.payload.outcome.name,
      });
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      const betToRemove = state.basket.find((b) => b.eventId === action.payload);
      if (betToRemove) {
        logRemoveFromBetSlip({
          bet_id: crypto.randomUUID(),
          match_id: betToRemove.eventId,
          odds: betToRemove.outcome.price,
          selection: betToRemove.outcome.name,
        });
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
