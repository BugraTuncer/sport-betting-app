import { Link } from 'react-router-dom';
import type { MatchCardProps } from '~/models/matches';
import { OutcomeBox } from './OutcomeBox';
import { isSelectedMatch, findMatchOutcomes, getSportIcon } from '~/utils/matchUtils';

export const MatchCard = ({
  event,
  onSelectOutcome,
  bookmakerTitles,
  bets,
  selectedSport,
}: MatchCardProps) => {
  const { id, home_team, away_team, commence_time } = event;

  const matchOutcomes = findMatchOutcomes(event, bookmakerTitles);
  if (!matchOutcomes) return null;

  const { homeOutcome, awayOutcome, drawOutcome, totalsOutcomes } = matchOutcomes;

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
            <span className="mr-2">{getSportIcon(selectedSport)}</span>
            <span className="font-bold">{home_team}</span> <span className="mx-1">-</span>
            <span className="font-bold">{away_team}</span>
          </Link>
        </div>

        <div className="flex gap-2">
          <OutcomeBox
            label="MR 1"
            outcome={homeOutcome}
            selected={!!homeOutcome && isSelectedMatch(bets, id, homeOutcome.name, false)}
            onClick={() =>
              homeOutcome &&
              onSelectOutcome(id, homeOutcome, home_team, away_team, commence_time, bookmakerTitles)
            }
          />
          <OutcomeBox
            label="MR X"
            outcome={drawOutcome}
            selected={!!drawOutcome && isSelectedMatch(bets, id, drawOutcome.name, false)}
            onClick={() =>
              drawOutcome &&
              onSelectOutcome(id, drawOutcome, home_team, away_team, commence_time, bookmakerTitles)
            }
          />
          <OutcomeBox
            label="MR 2"
            outcome={awayOutcome}
            selected={!!awayOutcome && isSelectedMatch(bets, id, awayOutcome.name, false)}
            onClick={() =>
              awayOutcome &&
              onSelectOutcome(id, awayOutcome, home_team, away_team, commence_time, bookmakerTitles)
            }
          />
          {totalsOutcomes.map((outcome) => (
            <OutcomeBox
              key={outcome.name + outcome.point}
              label={`${outcome.point} ${outcome.name}`}
              outcome={outcome}
              selected={isSelectedMatch(bets, id, outcome.name, true)}
              onClick={() =>
                onSelectOutcome(id, outcome, home_team, away_team, commence_time, bookmakerTitles)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
