import { useMemo, useState } from 'react';
import type { Route } from './+types/home';
import type { Match } from '~/models/matches';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store';
import MatchListContainer from '~/containers/match/MatchListContainer';
import ProtectedRoute from '~/components/common/ProtectedRoute';
import MainLayout from '~/components/layout/MainLayout';
import SportsNav from '~/components/sport/SportsNav';
import { filterMatchesBySport } from '~/utils/matchUtils';
import { useMatches } from '~/hooks/useMatches';
import LoadingSpinner from '~/components/common/LoadingSpinner';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sports Betting App' }, { name: 'description', content: 'Sports Betting App' }];
}

export default function Home() {
  const [selectedSport, setSelectedSport] = useState('soccer');
  const bets = useSelector((state: RootState) => state.bet.basket);
  const { matches, loading }: { matches: Match[]; loading: boolean } = useMatches();

  const filteredMatches = useMemo(
    () => filterMatchesBySport(matches, selectedSport),
    [matches, selectedSport]
  );

  return (
    <ProtectedRoute>
      <MainLayout>
        <SportsNav onSportSelect={setSelectedSport} selectedSport={selectedSport} />
        <div className="container mx-auto p-2 sm:p-4">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <MatchListContainer matches={filteredMatches} bets={bets} />
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
