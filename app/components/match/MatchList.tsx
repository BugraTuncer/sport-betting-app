import type { Match } from '~/models/matches';
import LeagueCard from './LeagueCard';
import type { Bet } from '~/models/bets';
import { useState, useMemo, useCallback } from 'react';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';
import SearchBar from '../common/SearchBar';

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
    <div>
      <div className="px-5 mb-5">
        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
      </div>
      <div className="font-sans">
        {Object.entries(matchesByLeague).map(([league, leagueMatches]) => (
          <LeagueCard
            key={league}
            leagueTitle={league}
            matches={leagueMatches}
            bets={bets}
            commenceTime={leagueMatches[0].commence_time}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchList;
