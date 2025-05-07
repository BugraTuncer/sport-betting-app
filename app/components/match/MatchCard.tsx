import { Link } from 'react-router-dom';
import type { Match, Outcome } from '~/models/matches';
import { OutcomeBox } from './OutcomeBox';
import type { Bet } from '~/models/bets';
import { isSelected, findMatchOutcomes, getIconBySport } from '~/utils/matchUtils';

type MatchCardProps = {
  event: Match;
  bets: Bet[];
  onSelectOutcome: (
    eventId: string,
    outcome: Outcome,
    home_team: string,
    away_team: string
  ) => void;
};

export const MatchCard = ({ event, bets, onSelectOutcome }: MatchCardProps) => {
  const { id, home_team, away_team } = event;

  const matchOutcomes = findMatchOutcomes(event);
  if (!matchOutcomes) return null;

  const { homeOutcome, awayOutcome, drawOutcome } = matchOutcomes;

  return (
    <div key={id} className="mb-2.5 rounded bg-white shadow-sm overflow-hidden">
      <div className="p-2 sm:p-4 gap-2 flex flex-col sm:flex-row justify-between">
        <div className="flex items-center">
          <Link
            to={`/match/${id}`}
            onClick={() => {
              localStorage.setItem('matchInfos', JSON.stringify(event));
            }}
            className="flex items-center text-sm transition-colors"
          >
            <span className="mr-2">{getIconBySport(event.sport_key)}</span>
            <span className="font-bold">{home_team}</span> <span className="mx-1">-</span>
            <span className="font-bold">{away_team}</span>
          </Link>
        </div>

        <div className="flex gap-1">
          <OutcomeBox
            label="MS 1"
            outcome={homeOutcome}
            selected={!!homeOutcome && isSelected(bets, id, homeOutcome.name)}
            onClick={() => homeOutcome && onSelectOutcome(id, homeOutcome, home_team, away_team)}
          />
          <OutcomeBox
            label="MS X"
            outcome={drawOutcome}
            selected={!!drawOutcome && isSelected(bets, id, drawOutcome.name)}
            onClick={() => drawOutcome && onSelectOutcome(id, drawOutcome, home_team, away_team)}
          />
          <OutcomeBox
            label="MS 2"
            outcome={awayOutcome}
            selected={!!awayOutcome && isSelected(bets, id, awayOutcome.name)}
            onClick={() => awayOutcome && onSelectOutcome(id, awayOutcome, home_team, away_team)}
          />
        </div>
      </div>
    </div>
  );
};
