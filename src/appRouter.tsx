import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PersonSettingsRegular } from "@fluentui/react-icons";

const LandingPage = lazy(() => import('./pages/LandingPage'));
const UserAdminPage = lazy(() => import('./pages/UserAdminPage'));

export const routes = [
  {
    path: "/",
    key: "home",
    localizationKey: "sideNav.home",
    icon: "home",
    element: <LandingPage />
  },
  {
    path: "/user-admin",
    key: "user-admin",
    localizationKey: "sideNav.userAdmin",
    icon: <PersonSettingsRegular />,
    element: <UserAdminPage />
  }
];

const appRouter = createBrowserRouter(routes);
export default appRouter;