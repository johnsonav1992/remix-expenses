import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import sharedStyles from '~/styles/shared.css'
import Error from "./components/util/Error";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const Document = ({ title, children }) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet" />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document >
  );
}

export const CatchBoundary = () => {
  const caughtResponse = useCatch()
  
  return <Document title={caughtResponse.statusText}>
    <main>
      <Error title={caughtResponse.statusText}>
        <p>{caughtResponse.data?.message || 'Something went wrong, please try again later'}</p>
        <p>Back to <Link to="/">safety</Link>.</p>
      </Error>
    </main>
  </Document>
}

export const ErrorBoundary = () => {
  
}

export const links = () => {
  return [{rel: 'stylesheet', href: sharedStyles}]
}
