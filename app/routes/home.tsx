import type { Route } from './+types/home';
import type { Match } from '~/models/matches';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '~/store';
import { setSelectedSport } from '~/store/slices/sportSlice';
import MatchListContainer from '~/containers/match/MatchListContainer';
import ProtectedRoute from '~/components/common/ProtectedRoute';
import MainLayout from '~/components/layout/MainLayout';
import SportsNav from '~/components/sport/SportsNav';
import { useMatches } from '~/hooks/useMatches';
import LoadingSpinner from '~/components/common/LoadingSpinner';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sports Betting App' }, { name: 'description', content: 'Sports Betting App' }];
}

export default function Home() {
  const dispatch = useDispatch();
  const selectedSport = useSelector((state: RootState) => state.sport.selectedSport);
  const bets = useSelector((state: RootState) => state.bet.basket);
  const { matches, loading }: { matches: Match[]; loading: boolean } = useMatches(selectedSport);

  const handleSportSelect = (sport: string) => {
    dispatch(setSelectedSport(sport));
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <SportsNav onSportSelect={handleSportSelect} selectedSport={selectedSport} />
        <div className="container mx-auto p-2 sm:p-4">
          {loading ? <LoadingSpinner /> : <MatchListContainer matches={matches} bets={bets} />}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
