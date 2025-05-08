import { useState, useEffect } from 'react';
import type { Sport } from '~/models/sports';
import { getSports } from '~/services/api';

export const useSports = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setIsLoading(true);
        const sportsData = await getSports();
        setSports(sportsData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSports();
  }, []);

  return { sports, isLoading };
};
