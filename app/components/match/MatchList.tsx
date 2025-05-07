import type { Match } from '~/models/matches';
import LeagueCard from './LeagueCard';
import type { Bet } from '~/models/bets';
import { useState, useMemo, useCallback } from 'react';
import SearchBar from '../common/SearchBar';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';
import { motion } from 'framer-motion';

interface MatchesByLeague {
  [league: string]: Match[];
}

const MatchList = ({ matches, bets }: { matches: Match[]; bets: Bet[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(
      (match) =>
        match.sport_title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        match.home_team.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        match.away_team.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [matches, debouncedSearchTerm]);

  const matchesByLeague = useMemo(() => {
    return filteredMatches.reduce<MatchesByLeague>((acc, match) => {
      const league = match.sport_title;
      if (!acc[league]) {
        acc[league] = [];
      }
      acc[league].push(match);
      return acc;
    }, {});
  }, [filteredMatches]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="px-5 mb-5">
        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
      </div>
      <motion.div
        className="font-sans"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          staggerChildren: 0.1,
        }}
      >
        {Object.entries(matchesByLeague).length > 0 ? (
          Object.entries(matchesByLeague).map(([league, leagueMatches]) => (
            <motion.div
              key={league}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LeagueCard
                key={league}
                leagueTitle={league}
                matches={leagueMatches}
                bets={bets}
                commenceTime={leagueMatches[0].commence_time}
              />
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500">No matches found</div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MatchList;
