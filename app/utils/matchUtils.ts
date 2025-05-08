import type { Match, Outcome } from '~/models/matches';
import type { Bet } from '~/models/bets';
import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import { addToBasket, removeFromBasket } from '~/store/slices/betSlice';

export const isSelectedMatch = (
  bets: Bet[],
  eventId: string,
  outcomeName: string,
  isHandicap: boolean = false
): boolean =>
  bets.some(
    (b) =>
      b.eventId === eventId &&
      b.outcome.name === outcomeName &&
      ((isHandicap && b.outcome.point !== undefined) ||
        (!isHandicap && b.outcome.point === undefined))
  );

export const findMatchOutcomes = (event: Match, bookmakerTitles: string[]) => {
  const matchBookmaker = bookmakerTitles
    .map((name) => event.bookmakers.find((b) => b.title === name))
    .filter((b) => b !== undefined)
    .sort((a, b) => b.markets.length - a.markets.length)[0];

  if (!matchBookmaker) return null;
  const h2hMarket = matchBookmaker.markets.find((m) => m.key === 'h2h');
  const outcomes = h2hMarket?.outcomes || [];
  const homeOutcome = outcomes.find((o) => o.name === event.home_team);
  const awayOutcome = outcomes.find((o) => o.name === event.away_team);
  const drawOutcome = outcomes.find(
    (o) => o.name !== event.home_team && o.name !== event.away_team
  );

  const totalsMarket = matchBookmaker.markets.find((m) => m.key === 'totals');
  const totalsOutcomes = totalsMarket?.outcomes || [];

  const spreadsMarket = matchBookmaker.markets.find((m) => m.key === 'spreads');
  const spreadsOutcomes = spreadsMarket?.outcomes || [];

  return {
    matchBookmaker,
    outcomes,
    homeOutcome,
    awayOutcome,
    drawOutcome,
    totalsMarket,
    totalsOutcomes,
    spreadsMarket,
    spreadsOutcomes,
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
      case 'baseball':
      case 'icehockey':
      case 'handball':
      case 'snooker':
        return sportKey.includes(selectedSport);
      default:
        return true;
    }
  });
};

export const getMatchResultLabel = (outcome: Outcome, home: string, away: string) => {
  if (outcome.name !== 'Over' && outcome.name !== 'Under' && outcome.point) {
    return `H ${outcome.point} ${outcome.name} `;
  }
  if (outcome.name === 'Over') return `Over ${outcome.point}`;
  if (outcome.name === 'Under') return `Under ${outcome.point}`;
  if (outcome.name === home) return '1';
  if (outcome.name === away) return '2';
  return 'X';
};

export const getIconBySport = (sport: string) => {
  if (sport.includes('cricket')) return '🏏';
  if (sport.includes('soccer')) return '⚽';
  if (sport.includes('basketball')) return '🏀';
  if (sport.includes('volleyball')) return '🏐';
  if (sport.includes('tennis')) return '🎾';
  if (sport.includes('baseball')) return '⚾';
  if (sport.includes('icehockey')) return '🏒';
  if (sport.includes('handball')) return '🤾';
  if (sport.includes('snooker')) return '🎱';
  return '🎲';
};

export const formatMatchDate = (commenceTime: string) => {
  const date = parseISO(commenceTime);
  if (isToday(date)) {
    return `Today : ${format(date, 'HH:mm', { locale: tr })}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow : ${format(date, 'HH:mm', { locale: tr })}`;
  } else if (isYesterday(date)) {
    return `Yesterday : ${format(date, 'HH:mm', { locale: tr })}`;
  } else {
    return `${format(date, 'dd.MM.yyyy')} : ${format(date, 'HH:mm')}`;
  }
};

export const handleOutcomeSelection = (
  eventId: string,
  outcome: Outcome,
  home_team: string,
  away_team: string,
  bets: Bet[],
  dispatch: any,
  commence_time?: string
) => {
  if (commence_time) {
    const currentDate = new Date();
    if (new Date(commence_time).getTime() < currentDate.getTime()) {
      return { hasStarted: true };
    }
  }

  const existingBet = bets.find((b) => b.eventId === eventId);
  if (existingBet) {
    dispatch(removeFromBasket(eventId));
  }

  if (
    existingBet &&
    existingBet.outcome.name === outcome.name &&
    existingBet.outcome.point === outcome.point
  ) {
    return { hasStarted: false };
  }

  dispatch(addToBasket({ eventId, outcome, home_team, away_team }));

  return { hasStarted: false };
};

export const getAllBookmakerTitles = async (events: Match[]): Promise<string[]> => {
  const titles = new Set<string>();

  events.forEach((event) => {
    event.bookmakers?.forEach((bookmaker) => {
      if (bookmaker?.title) {
        titles.add(bookmaker.title);
      }
    });
  });

  return Array.from(titles).sort();
};
