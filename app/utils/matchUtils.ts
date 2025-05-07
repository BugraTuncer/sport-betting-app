import type { Match, Outcome } from '~/models/matches';
import type { Bet } from '~/models/bets';

export const isSelected = (bets: Bet[], eventId: string, outcomeName: string): boolean =>
  bets.some((b) => b.eventId === eventId && b.outcome.name === outcomeName);

export const findMatchOutcomes = (event: Match) => {
  const betfair = event.bookmakers.find((b) => b.title === 'Betfair');
  if (!betfair) return null;

  const outcomes = betfair.markets?.[0]?.outcomes || [];
  const homeOutcome = outcomes.find((o) => o.name === event.home_team);
  const awayOutcome = outcomes.find((o) => o.name === event.away_team);
  const drawOutcome = outcomes.find(
    (o) => o.name !== event.home_team && o.name !== event.away_team
  );

  return {
    betfair,
    outcomes,
    homeOutcome,
    awayOutcome,
    drawOutcome,
  };
};

export const filterMatchesBySport = (matches: Match[], selectedSport: string) => {
  return matches.filter((match) => {
    const sportKey = match.sport_key.toLowerCase();

    switch (selectedSport) {
      case 'cricket':
      case 'soccer':
      case 'basketball':
      case 'volleyball':
      case 'tennis':
      case 'icehockey':
      case 'handball':
      case 'snooker':
        return sportKey.includes(selectedSport);
      default:
        return true;
    }
  });
};

export const getMatchResultLabel = (outcomeName: string, home: string, away: string) => {
  if (outcomeName === home) return '1';
  if (outcomeName === away) return '2';
  return 'X';
};

export const getIconBySport = (sport: string) => {
  if (sport.includes('cricket')) return '🏏';
  if (sport.includes('soccer')) return '⚽';
  if (sport.includes('basketball')) return '🏀';
  if (sport.includes('volleyball')) return '🏐';
  if (sport.includes('tennis')) return '🎾';
  if (sport.includes('icehockey')) return '🏒';
  if (sport.includes('handball')) return '🤾';
  if (sport.includes('snooker')) return '🎱';
  return '🎲';
};
