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
import type { Route } from './+types/root';
import './app.css';

export const links: Route.LinksFunction = () => [
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

  return (
    <div className="bg-primary h-16 w-full">
      <div className="container mx-auto flex items-center justify-between h-full">
        <p className="text-white text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          Sports Betting App
        </p>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Layout>
      <AppContent />
    </Layout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? 'Üzgünüz, bu sayfaya şu an ulaşılamıyor.' : 'Error';
    details =
      error.status === 404
        ? 'Tıkladığın bağlantı bozuk olabilir veya sayfa kaldırılmış olabilir.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold">{message}</h1>
      <p className="text-gray-500">{details}</p>
      <img src="404-page.png" alt="404" className="w-1/4" />
      <Link to="/" className="bg-primary text-white px-4 py-2 rounded-md">
        Anasayfaya dön
      </Link>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
