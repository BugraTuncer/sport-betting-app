import axios from 'axios';
import type { Match } from '~/models/matches';
import type { Sport } from '~/models/sports';
const MATCHES_BASE_URL = 'https://api.the-odds-api.com/v4/sports/';
const SPORTS_BASE_URL = 'https://api.the-odds-api.com/v4/sports';

const getMatches = async (sport: string): Promise<Match[]> => {
  const response = await axios.get(
    MATCHES_BASE_URL +
      `${sport}/odds/?regions=eu&markets=h2h,spreads,totals&` +
      'apiKey=' +
      import.meta.env.VITE_ODDS_API
  );
  return response.data;
};

const getSports = async (): Promise<Sport[]> => {
  const response = await axios.get(SPORTS_BASE_URL + '?apiKey=' + import.meta.env.VITE_ODDS_API);
  return response.data;
};

export { getMatches, getSports };
