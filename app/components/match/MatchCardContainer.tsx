import { useDispatch } from 'react-redux';
import type { Match, Outcome } from '~/models/matches';
import { useMemo } from 'react';
import type { Bet } from '~/models/bets';
import { MatchCard } from './MatchCard';
import { addToBasket, removeFromBasket } from '~/store/slices/betSlice';

type MatchCardContainerProps = {
  event: Match;
  bets: Bet[];
};

export const MatchCardContainer = ({ event, bets }: MatchCardContainerProps) => {
  const dispatch = useDispatch();

  const handleSelectOutcome = (
    eventId: string,
    outcome: Outcome,
    home_team: string,
    away_team: string
  ) => {
    const existingBet = bets.find((bet) => bet.eventId === eventId);

    if (existingBet?.outcome.name === outcome.name) {
      dispatch(removeFromBasket(eventId));
    } else {
      dispatch(addToBasket({ eventId, outcome, home_team, away_team }));
    }
  };

  return <MatchCard event={event} bets={bets} onSelectOutcome={handleSelectOutcome} />;
};
