import { lazy, Suspense, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { Msal2AuthenticationService } from 'mgwdev-m365-helpers/lib-commonjs/services/Msal2AuthenticationService';
import { AuthenticationContextProvider, DataverseContextProvider, GraphContextProvider, SPContextProvider } from 'mgwdev-m365-components'
import { AppHeader } from './components/common/AppHeader'
import { Spinner } from '@fluentui/react-components'

const LandingPage = lazy(() => import('./pages/LandingPage'));
const clientId = import.meta.env.VITE_FRONTEND_CLIENT_ID;
const tenantId = import.meta.env.VITE_FRONTEND_TENANT_ID || "organizations";
const dataverseEnv = import.meta.env.VITE_FRONTEND_DATAVERSE_ENV;
const spSiteUrl = import.meta.env.VITE_FRONTEND_SP_SITE_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  }
]);

function App() {
  const authService = new Msal2AuthenticationService(
    { clientId: clientId, tenantId: tenantId, redirectUri: `${window.location.origin}/redirect` },
    false
  );
  return (
    <AuthenticationContextProvider authProvider={authService}>
      <GraphContextProvider>
        <DataverseContextProvider dataverseResource={dataverseEnv}>
          <SPContextProvider siteUrl={spSiteUrl}>
            <AppHeader navigateTo={router.navigate} />
            <Suspense fallback={<Spinner size="large" />}>
              <RouterProvider router={router} />
            </Suspense>
          </SPContextProvider>
        </DataverseContextProvider>
      </GraphContextProvider>
    </AuthenticationContextProvider>
  )
}

export default App
