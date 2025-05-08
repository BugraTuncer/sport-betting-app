import type { Bet } from './bets';

export interface Outcome {
  name: string;
  price: number;
  point?: number;
}

export interface Market {
  key: string;
  last_update: string;
  outcomes: Outcome[];
}

export interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

export interface Match {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

export interface MatchListProps {
  leagueCards: React.ReactNode[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export interface MatchCardContainerProps {
  event: Match;
}

export interface MatchesByLeague {
  [league: string]: Match[];
}

export interface MatchListContainerProps {
  matches: Match[];
  bets: Bet[];
}

export interface MatchCardProps {
  event: Match;
  onSelectOutcome: (
    eventId: string,
    outcome: Outcome,
    home_team: string,
    away_team: string,
    commence_time: string
  ) => void;
  bookmakerTitles: string[];
  bets: Bet[];
  selectedSport: string;
}

export interface MatchDetailProps {
  matchInfos: Match;
  matchOutcomes: {
    matchBookmaker: Bookmaker;
    outcomes: Outcome[];
    homeOutcome: Outcome;
    awayOutcome: Outcome;
    drawOutcome: Outcome | undefined;
    totalsMarket?: Market;
    totalsOutcomes?: Outcome[];
    spreadsMarket?: Market;
    spreadsOutcomes?: Outcome[];
  };
  bets: Bet[];
  showWarningModal: boolean;
  setShowWarningModal: (show: boolean) => void;
  onSelectOutcome: (
    eventId: string,
    outcome: Outcome,
    home_team: string,
    away_team: string,
    commence_time: string
  ) => void;
}

export type MatchesByLeagueAndTime = {
  [league: string]: {
    [time: string]: Match[];
  };
};
