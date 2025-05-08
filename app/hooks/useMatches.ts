import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Match } from '~/models/matches';
import { getAllBookmakerTitles, getMatches } from '~/services/api';
import { setBookmakerTitles } from '~/store/slices/bookmakerSlice';
import type { RootState } from '~/store';

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const bookmakerTitles = useSelector((state: RootState) => state.bookmaker.titles);

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
