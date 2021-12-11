import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix';
import type {LinksFunction} from 'remix';

import globalStylesUrl from '~/styles/global.css';
import darkStylesUrl from '~/styles/dark.css';
import {Footer, Header} from './layout';
import StyledContext from './styled-context';
import {useContext} from 'react';

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: globalStylesUrl},
    {
      rel: 'stylesheet',
      href: darkStylesUrl,
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Mulish:wght@200&display=swap',
    },
  ];
};

export default function App() {
  return (
    <Document title="Discrete world">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export const ErrorBoundary = ({error}: {error: Error}) => (
  <Document title="Error!">
    <Layout>
      <div>
        <h1>There was an error</h1>
        <p>{error.message}</p>
        <hr />
        <p>
          Hey, developer, you should replace this with what you want your users to see.
        </p>
      </div>
    </Layout>
  </Document>
);

export const CatchBoundary = () => {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>
      );
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
};

const Document = ({children, title}: {children: React.ReactNode; title?: string}) => {
  const styles = useContext(StyledContext);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link data-trunk href="assets/logo.svg" rel="icon" />
        {title ? <title>{title}</title> : null}
        <Meta />
        {styles}
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
};

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="remix-app">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
