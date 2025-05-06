import { useEffect, useState } from 'react';
import type { Match } from '~/models/matches';
import { getMatches } from '~/services/api';

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await getMatches();
        setMatches(response);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return { matches, loading };
};
