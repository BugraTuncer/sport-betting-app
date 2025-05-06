import { Link } from 'react-router-dom';
import type { Match, Outcome } from '~/models/matches';
import { OutcomeBox } from './OutcomeBox';
import type { Bet } from '~/models/bets';
import { isSelected, findMatchOutcomes } from '~/utils/matchUtils';

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
      <div className="p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to={`/match/${id}`}
            onClick={() => {
              localStorage.setItem('matchInfos', JSON.stringify(event));
            }}
            className="flex items-center text-sm transition-colors"
          >
            <span className="inline-block bg-[#702c82] text-white text-sm px-2 py-0.5 rounded mr-2"></span>
            {home_team} - {away_team}
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
