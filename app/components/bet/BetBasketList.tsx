import React from 'react';
import { getMatchResultLabel } from '~/utils/matchUtils';
import Button from '../common/Button';
import { removeFromBasket } from '~/store/slices/betSlice';
import type { BetSlice } from '~/models/bets';
import type { Dispatch } from '@reduxjs/toolkit';

const BetBasketList = ({ bet, dispatch }: { bet: BetSlice; dispatch: Dispatch }) => {
  return (
    <div key={bet.eventId} className="bg-gray-50 p-3 rounded-lg relative">
      <Button
        onClick={() => dispatch(removeFromBasket(bet.eventId))}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
      >
        ✕
      </Button>
      <div className="text-sm">
        {bet.home_team} - {bet.away_team}
      </div>
      <div className="flex justify-between mt-1">
        <div className="flex items-center">
          <div className="bg-gray-200 rounded-l-md px-2 py-1">
            <span className="text-sm font-bold">
              {getMatchResultLabel(bet.outcome.name, bet.home_team, bet.away_team)}
            </span>
          </div>
          <div className="bg-[#efd055] rounded-r-md px-2 py-1">
            <span className="text-sm font-bold">{bet.outcome.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetBasketList;
