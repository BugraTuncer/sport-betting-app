import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MatchDetail from '~/components/match/MatchDetail';
import { logMatchDetailView } from '~/config/firebase';
import type { Outcome } from '~/models/matches';
import type { RootState } from '~/store';
import { handleOutcomeSelection, findMatchOutcomes } from '~/utils/matchUtils';

const MatchDetailContainer = () => {
  const [matchInfos, setMatchInfos] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const bets = useSelector((state: RootState) => state.bet.basket);
  const bookmakerTitles = useSelector((state: RootState) => state.bookmaker.titles);
  const dispatch = useDispatch();

  useEffect(() => {
    const matchInfos = localStorage.getItem('matchInfos');
    const matchInfosParsed = matchInfos ? JSON.parse(matchInfos) : null;
    setMatchInfos(matchInfosParsed);
    if (matchInfosParsed) {
      logMatchDetailView({
        match_id: matchInfosParsed.id,
        match_name: `${matchInfosParsed.home_team} - ${matchInfosParsed.away_team}`,
        league: matchInfosParsed.sport_title,
      });
    }
  }, []);

  const matchOutcomes = useMemo(() => {
    if (!matchInfos) return null;
    return findMatchOutcomes(matchInfos, bookmakerTitles);
  }, [matchInfos, bookmakerTitles]);

  const onSelectOutcome = useCallback(
    (eventId: string, outcome: Outcome, home: string, away: string, commence_time: string) => {
      const result = handleOutcomeSelection(
        eventId,
        outcome,
        home,
        away,
        bets,
        dispatch,
        commence_time
      );
      if (result.hasStarted) {
        setShowWarningModal(true);
      }
    },
    [bets, dispatch]
  );

  if (!matchInfos || !matchOutcomes) return null;

  return (
    <MatchDetail
      matchInfos={matchInfos}
      matchOutcomes={matchOutcomes}
      showWarningModal={showWarningModal}
      setShowWarningModal={setShowWarningModal}
      onSelectOutcome={onSelectOutcome}
      bets={bets}
    />
  );
};

export default MatchDetailContainer;
