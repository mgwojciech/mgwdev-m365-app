import { Suspense } from 'react'
import { makeStyles, tokens } from '@fluentui/react-components';
import { RouterProvider } from 'react-router-dom'
import { Msal2AuthenticationService } from 'mgwdev-m365-helpers/lib/services/Msal2AuthenticationService';
import { AuthenticationContextProvider, DataverseContextProvider, GraphContextProvider, SPContextProvider } from 'mgwdev-m365-components'
import { AppHeader } from './components/common/AppHeader/AppHeader'
import { Spinner } from '@fluentui/react-components'
import { LocalizationProvider } from './context/LocalizationContext';
import { SideNav } from './components/common/SideNav/SideNav';
import router, { routes } from './appRouter';
import { ToasterProvider } from './context/ToasterContext';

const clientId = import.meta.env.VITE_FRONTEND_CLIENT_ID;
const tenantId = import.meta.env.VITE_FRONTEND_TENANT_ID || "organizations";
const dataverseEnv = import.meta.env.VITE_FRONTEND_DATAVERSE_ENV;
const spSiteUrl = import.meta.env.VITE_FRONTEND_SP_SITE_URL;

const useRootStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
  appSurfaceWrapper: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    width: "100%",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  contentWrapper: {
    padding: tokens.spacingHorizontalL,
    boxSizing: "border-box",
    overflow: "auto"
  }
});

function App() {
  const authService = new Msal2AuthenticationService(
    { clientId: clientId, tenantId: tenantId, redirectUri: `${window.location.origin}/redirect` },
    false
  );

  const styles = useRootStyles();

  return (
    <LocalizationProvider>
      <AuthenticationContextProvider authProvider={authService}>
        <GraphContextProvider>
          <DataverseContextProvider dataverseResource={dataverseEnv}>
            <SPContextProvider siteUrl={spSiteUrl}>
              <div className={styles.root}>
                <AppHeader navigateTo={router.navigate} onLocationChange={router.subscribe} />
                <div className={styles.appSurfaceWrapper}>
                  <SideNav navigateTo={router.navigate} navigationItems={routes.map(route => ({
                    key: route.key,
                    localizationKey: route.localizationKey,
                    icon: route.icon,
                    onClick: () => router.navigate(route.path)
                  }))} />
                  <ToasterProvider>
                    <div className={styles.contentWrapper}>
                      <Suspense fallback={<Spinner size="large" />}>
                        <RouterProvider router={router} />
                      </Suspense>
                    </div>
                  </ToasterProvider>
                </div>
              </div>
            </SPContextProvider>
          </DataverseContextProvider>
        </GraphContextProvider>
      </AuthenticationContextProvider>
    </LocalizationProvider>
  )
}

export default App
