import { useState, useMemo, useCallback } from 'react';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';
import type { MatchesByLeague, MatchListContainerProps } from '~/models/matches';
import MatchList from '~/components/match/MatchList';
import LeagueCard from '~/components/match/LeagueCard';

export default function MatchListContainer({ matches }: MatchListContainerProps) {
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

  const leagueCards = useMemo(() => {
    return Object.entries(matchesByLeague).map(([league, leagueMatches]) => (
      <LeagueCard
        key={league}
        leagueTitle={league}
        matches={leagueMatches}
        commenceTime={leagueMatches[0].commence_time}
      />
    ));
  }, [matchesByLeague]);

  return (
    <MatchList
      leagueCards={leagueCards}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
    />
  );
}
