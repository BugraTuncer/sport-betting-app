import { useMemo, useState } from 'react';
import type { Route } from './+types/home';
import type { Match } from '~/models/matches';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store';
import ProtectedRoute from '~/components/common/ProtectedRoute';
import { filterMatchesBySport } from '~/utils/matchUtils';
import { useMatches } from '~/hooks/useMatches';
import MatchList from '~/components/match/MatchList';

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
      <div className="container mx-auto p-6">
        <MatchList bets={bets} matches={filteredMatches} />
      </div>
    </ProtectedRoute>
  );
}
