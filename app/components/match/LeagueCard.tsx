import type { Match } from '~/models/matches';
import { MatchCardContainer } from './MatchCardContainer';
import type { Bet } from '~/models/bets';

type LeagueCardProps = {
  leagueTitle: string;
  matches: Match[];
  bets: Bet[];
  commenceTime: string;
};

const LeagueCard = ({ commenceTime, leagueTitle, matches, bets }: LeagueCardProps) => {
  return (
    <div className="mb-6 rounded-lg overflow-hidden bg-gray-50 sm:shadow-md ">
      <div className="p-4 bg-[#1c3c5c] text-white flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-bold">{leagueTitle}</h2>
        <p className="text-sm sm:text-lg">
          Today{' '}
          {new Date(commenceTime).toLocaleString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      <div className="p-4">
        {matches.map((match) => (
          <MatchCardContainer key={match.id} event={match} bets={bets} />
        ))}
      </div>
    </div>
  );
};

export default LeagueCard;
