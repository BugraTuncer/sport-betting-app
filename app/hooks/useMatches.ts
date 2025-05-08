import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { Match } from '~/models/matches';
import { getMatches } from '~/services/api';
import { setBookmakerTitles } from '~/store/slices/bookmakerSlice';
import { getAllBookmakerTitles } from '~/utils/matchUtils';

export const useMatches = (selectedSport: string) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchMatches = async () => {
      try {
        const response = await getMatches(selectedSport.toLowerCase().replace(' ', ''));
        const bookmakerTitlesResponse = await getAllBookmakerTitles(response);
        dispatch(setBookmakerTitles(bookmakerTitlesResponse));
        setMatches(response.filter((match) => match.bookmakers.length > 0));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [dispatch, selectedSport]);

  return { matches, loading };
};
