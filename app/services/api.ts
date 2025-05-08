import axios from 'axios';
import type { Match } from '~/models/matches';
import type { Sport } from '~/models/sports';
const MATCHES_BASE_URL =
  'https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=eu&markets=h2h&';
const SPORTS_BASE_URL = 'https://api.the-odds-api.com/v4/sports';

const getMatches = async (): Promise<Match[]> => {
  const response = await axios.get(MATCHES_BASE_URL + 'apiKey=' + import.meta.env.VITE_ODDS_API);
  return response.data;
};

const getSports = async (): Promise<Sport[]> => {
  const response = await axios.get(SPORTS_BASE_URL + '?apiKey=' + import.meta.env.VITE_ODDS_API);
  return response.data;
};

const getAllBookmakerTitles = async (events: Match[]): Promise<string[]> => {
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

export { getMatches, getSports, getAllBookmakerTitles };
