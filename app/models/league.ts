import type { Bet } from './bets';
import type { Match } from './matches';

export interface LeagueCardProps {
  leagueTitle: string;
  matches: Match[];
  commenceTime: string;
}

export interface LeagueCardContainerProps {
  leagueTitle: string;
  matches: Match[];
  bets: Bet[];
  commenceTime: string;
}
