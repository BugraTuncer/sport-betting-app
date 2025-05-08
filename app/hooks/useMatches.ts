import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { Match } from '~/models/matches';
import { getMatches } from '~/services/api';
import { setBookmakerTitles } from '~/store/slices/bookmakerSlice';
import { getAllBookmakerTitles } from '~/utils/matchUtils';

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await getMatches();
        const bookmakerTitlesResponse = await getAllBookmakerTitles(response);
        dispatch(setBookmakerTitles(bookmakerTitlesResponse));
        setMatches(response);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [dispatch]);

  return { matches, loading };
};
