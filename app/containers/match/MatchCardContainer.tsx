import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '~/store/slices/betSlice';
import type { Match, MatchCardContainerProps, Outcome } from '~/models/matches';
import { MatchCard } from '~/components/match/MatchCard';
import type { Bet } from '~/models/bets';

export default function MatchCardContainer({ event, bets }: MatchCardContainerProps) {
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
}
