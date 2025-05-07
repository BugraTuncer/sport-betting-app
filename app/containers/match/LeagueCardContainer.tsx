import type { Match } from '~/models/matches';
import type { Bet } from '~/models/bets';
import LeagueCard from '~/components/match/LeagueCard';
import type { LeagueCardContainerProps } from '~/models/league';

export default function LeagueCardContainer({
  leagueTitle,
  matches,
  bets,
  commenceTime,
}: LeagueCardContainerProps) {
  return (
    <LeagueCard
      leagueTitle={leagueTitle}
      matches={matches}
      bets={bets}
      commenceTime={commenceTime}
    />
  );
}
