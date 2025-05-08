import { useDispatch, useSelector } from 'react-redux';
import type { MatchCardContainerProps, Outcome } from '~/models/matches';
import { MatchCard } from '~/components/match/MatchCard';
import type { RootState } from '~/store';
import { useState } from 'react';
import ConfirmationModal from '~/components/common/ConfirmationModal';
import { handleOutcomeSelection } from '~/utils/matchUtils';

export default function MatchCardContainer({ event }: MatchCardContainerProps) {
  const dispatch = useDispatch();
  const bookmakerTitles = useSelector((state: RootState) => state.bookmaker.titles);
  const bets = useSelector((state: RootState) => state.bet.basket);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const selectedSport = useSelector((state: RootState) => state.sport.selectedSport);
  const handleSelectOutcome = (
    eventId: string,
    outcome: Outcome,
    home_team: string,
    away_team: string,
    commence_time: string
  ) => {
    const result = handleOutcomeSelection(
      eventId,
      outcome,
      home_team,
      away_team,
      bets,
      dispatch,
      commence_time
    );
    if (result.hasStarted) {
      setShowWarningModal(true);
    }
  };

  return (
    <>
      <MatchCard
        event={event}
        onSelectOutcome={handleSelectOutcome}
        bookmakerTitles={bookmakerTitles}
        bets={bets}
        selectedSport={selectedSport}
      />
      <ConfirmationModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        onConfirm={() => setShowWarningModal(false)}
        title="Warning"
        message="This match has already started. You cannot add it to your basket."
        showButtons={false}
      />
    </>
  );
}
