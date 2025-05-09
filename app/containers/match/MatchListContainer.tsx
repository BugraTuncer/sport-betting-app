import { useState, useMemo, useCallback } from 'react';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';
import type { MatchesByLeagueAndTime, MatchListContainerProps } from '~/models/matches';
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

  const matchesByLeagueAndTime = useMemo(() => {
    const grouped: MatchesByLeagueAndTime = {};

    filteredMatches.forEach((match) => {
      const league = match.sport_title;
      const time = match.commence_time;

      if (!grouped[league]) {
        grouped[league] = {};
      }

      if (!grouped[league][time]) {
        grouped[league][time] = [];
      }

      grouped[league][time].push(match);
    });

    return grouped;
  }, [filteredMatches]);

  const leagueCards = useMemo(() => {
    return Object.entries(matchesByLeagueAndTime).flatMap(([league, timeGroups]) =>
      Object.entries(timeGroups).map(([time, leagueMatches]) => (
        <LeagueCard
          key={`${league}-${time}`}
          leagueTitle={league}
          matches={leagueMatches}
          commenceTime={time}
          isCompleted={new Date(time) < new Date()}
        />
      ))
    );
  }, [matchesByLeagueAndTime]);

  return (
    <MatchList
      leagueCards={leagueCards}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
    />
  );
}
