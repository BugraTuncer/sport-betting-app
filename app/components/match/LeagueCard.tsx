import MatchCardContainer from '~/containers/match/MatchCardContainer';
import type { LeagueCardProps } from '~/models/league';
import type { Match } from '~/models/matches';
import { formatMatchDate } from '~/utils/matchUtils';

export default function LeagueCard({ leagueTitle, matches, commenceTime }: LeagueCardProps) {
  return (
    <div className="mb-6 rounded-lg overflow-hidden bg-gray-50 sm:shadow-md ">
      <div className="p-4 bg-[#1c3c5c] text-white flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-bold">{leagueTitle}</h2>
        <p className="text-sm sm:text-lg">{formatMatchDate(commenceTime)}</p>
      </div>
      <div className="p-4">
        {matches.map((match) => (
          <MatchCardContainer key={match.id} event={match} />
        ))}
      </div>
    </div>
  );
}
