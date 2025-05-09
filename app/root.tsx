import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from 'react-router';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, persistor, type AppDispatch, type RootState } from './store';
import { initAuth, logout } from './store/slices/authSlice';
import type { Route } from './+types/root';
import './app.css';
import Button from './components/common/Button';
import { useEffect } from 'react';
import { PersistGate } from './components/common/PersistGateWrapper';
import ProtectedRoute from './components/common/ProtectedRoute';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon1.ico' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

function AppHeader() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-primary h-16 w-full">
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        <p
          className="text-white text-xl sm:text-xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          Sports Betting
        </p>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <p className="text-white text-xs sm:text-sm">{user?.email?.split('@')[0]}</p>
          {user ? (
            <Button
              onClick={() => handleLogout()}
              className="text-xs sm:text-sm text-white rounded-2xl border border-white px-2 py-1 cursor-pointer"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/login')}
              className="text-xs sm:text-sm text-white rounded-2xl border border-white px-2 py-1 cursor-pointer"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return (
    <ProtectedRoute>
      <AppHeader />
      <Outlet />
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContent />
          </PersistGate>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? 'Sorry, this page is not available.' : 'Error';
    details =
      error.status === 404
        ? 'The link you clicked may be broken or the page may have been removed.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="pt-16 p-4 container mx-auto flex flex-col items-center justify-center gap-8">
          <h1 className="text-2xl font-bold">{message}</h1>
          <p className="text-gray-500">{details}</p>
          <img src="404-page.png" alt="404" className="w-1/4" />
          <Link to="/" className="bg-primary text-white px-4 py-2 rounded-md">
            Go To Home
          </Link>
          {stack && (
            <pre className="w-full p-4 overflow-x-auto">
              <code>{stack}</code>
            </pre>
          )}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
