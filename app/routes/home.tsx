import ProtectedRoute from '~/components/ProtectedRoute';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sports Betting App' }, { name: 'description', content: 'Sports Betting App' }];
}

export default function Home() {
  return (
    <ProtectedRoute>
      <div>Sports Betting App</div>
    </ProtectedRoute>
  );
}
