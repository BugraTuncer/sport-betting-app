import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { Match, Outcome } from '~/models/matches';
import { addToBasket, removeFromBasket } from '~/store/slices/betSlice';
import type { RootState } from '~/store';
import { OutcomeBox } from '~/components/match/OutcomeBox';
import MainLayout from '~/components/layout/MainLayout';
import { isSelected, findMatchOutcomes } from '~/utils/matchUtils';
import Button from '~/components/common/Button';
import ProtectedRoute from '~/components/common/ProtectedRoute';

export default function MatchDetail() {
  const [matchInfos, setMatchInfos] = useState<Match>();
  const bets = useSelector((state: RootState) => state.bet.basket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const matchInfos = localStorage.getItem('matchInfos');
    const matchInfosParsed = matchInfos ? JSON.parse(matchInfos) : null;
    setMatchInfos(matchInfosParsed);
  }, []);

  const onSelectOutcome = useCallback(
    (eventId: string, outcome: Outcome, home: string, away: string) => {
      const isAlreadySelected = bets.find(
        (b) => b.eventId === eventId && b.outcome.name === outcome.name
      );
      if (isAlreadySelected) {
        dispatch(removeFromBasket(eventId));
      } else {
        dispatch(addToBasket({ eventId, outcome, home_team: home, away_team: away }));
      }
    },
    [bets, dispatch]
  );

  const matchOutcomes = useMemo(() => {
    if (!matchInfos) return null;
    return findMatchOutcomes(matchInfos);
  }, [matchInfos]);

  if (!matchInfos || !matchOutcomes) return null;

  const { homeOutcome, awayOutcome, drawOutcome } = matchOutcomes;

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md">
            <div
              className="flex flex-col mb-6 h-20 g-5 overflow-hidden text-center"
              style={{
                backgroundImage: 'url(/football-background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '250px',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}
            >
              <Button
                onClick={() => navigate('/')}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-4 mt-4 ml-4 cursor-pointer"
              >
                {'<'}
              </Button>
              <div className="flex-1 gap-5 flex flex-col">
                <h1 className="text-2xl font-bold mb-2 text-white">{matchInfos.sport_title}</h1>
                <div className="text-white text-sm">
                  {new Date(matchInfos.commence_time).toLocaleString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="text-white text-2xl">
                  {matchInfos.home_team} - {matchInfos.away_team}
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold p-3">Maç Sonucu</p>
              <div className="flex gap-2 p-3">
                <OutcomeBox
                  label="MR 1"
                  outcome={homeOutcome}
                  selected={!!homeOutcome && isSelected(bets, matchInfos.id, homeOutcome.name)}
                  onClick={() =>
                    homeOutcome &&
                    onSelectOutcome(
                      matchInfos.id,
                      homeOutcome,
                      matchInfos.home_team,
                      matchInfos.away_team
                    )
                  }
                />
                <OutcomeBox
                  label="MR X"
                  outcome={drawOutcome}
                  selected={!!drawOutcome && isSelected(bets, matchInfos.id, drawOutcome.name)}
                  onClick={() =>
                    drawOutcome &&
                    onSelectOutcome(
                      matchInfos.id,
                      drawOutcome,
                      matchInfos.home_team,
                      matchInfos.away_team
                    )
                  }
                />
                <OutcomeBox
                  label="MR 2"
                  outcome={awayOutcome}
                  selected={!!awayOutcome && isSelected(bets, matchInfos.id, awayOutcome.name)}
                  onClick={() =>
                    awayOutcome &&
                    onSelectOutcome(
                      matchInfos.id,
                      awayOutcome,
                      matchInfos.home_team,
                      matchInfos.away_team
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
