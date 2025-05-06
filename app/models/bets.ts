import type { Outcome } from './matches';

export interface Bet {
  eventId: string;
  outcome: Outcome;
}

export interface BetSlice {
  eventId: string;
  outcome: {
    name: string;
    price: number;
  };
  home_team: string;
  away_team: string;
}
