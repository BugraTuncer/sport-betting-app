import type { Match, Outcome } from '~/models/matches';
import type { Bet } from '~/models/bets';
import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import { addToBasket, removeFromBasket } from '~/store/slices/betSlice';

export const isSelectedMatch = (bets: Bet[], eventId: string, outcomeName: string): boolean =>
  bets.some((b) => b.eventId === eventId && b.outcome.name === outcomeName);

export const findMatchOutcomes = (event: Match, bookmakerTitles: string[]) => {
  const matchBookmaker = bookmakerTitles
    .map((name) => event.bookmakers.find((b) => b.title === name))
    .find((b) => b !== undefined);

  if (!matchBookmaker) return null;

  const outcomes = matchBookmaker.markets?.[0]?.outcomes || [];
  const homeOutcome = outcomes.find((o) => o.name === event.home_team);
  const awayOutcome = outcomes.find((o) => o.name === event.away_team);
  const drawOutcome = outcomes.find(
    (o) => o.name !== event.home_team && o.name !== event.away_team
  );

  if (!homeOutcome || !awayOutcome) return null;

  return {
    matchBookmaker,
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

  const isAlreadySelected = bets.find(
    (b) => b.eventId === eventId && b.outcome.name === outcome.name
  );

  if (isAlreadySelected) {
    dispatch(removeFromBasket(eventId));
  } else {
    dispatch(addToBasket({ eventId, outcome, home_team, away_team }));
  }

  return { hasStarted: false };
};
