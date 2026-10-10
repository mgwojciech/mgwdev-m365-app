# mgwdev-m365-app

This repository is a template for building Microsoft 365 React applications with Vite, TypeScript, Fluent UI, and the mgwdev-m365 helper libraries.

## Create a new project from this template

The suggested way to initialize a new project from this template is:

```bash
npx degit mgwojciech/mgwdev-m365-app new-project
```

Replace `new-project` with the folder name you want for the generated app.

### After generation

1. Change into the new folder.
2. Install dependencies with `npm install`.
3. Create a `.env.local` file in the project root.
4. Add the environment values required by the app:

You will need an app registration in EntraId with default scopes to MS Graph, Dynamics CRM and SharePoint.
Of course, if needed - You can remove the unneeded code and work only with Grpah, SP or Dataverse.
Your app registration needs to have configured reply url to http://localhost:3000 and http://localhost:3000/redirect - if You already have an app registered on different port, just update the port in `vite.config.ts`

If You need some help with it: [MS Docs](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

```env
VITE_FRONTEND_CLIENT_ID=your-application-client-id
VITE_FRONTEND_TENANT_ID=organizations
VITE_FRONTEND_DATAVERSE_ENV=your-dataverse-environment-url
VITE_FRONTEND_SP_SITE_URL=your-sharepoint-site-url
```

Sample env content

```env
VITE_FRONTEND_CLIENT_ID=45601286-xxxx-xxxx-xxxx-6e5b55ecab0d
VITE_FRONTEND_SP_SITE_URL=https://contoso.sharepoint.com
VITE_FRONTEND_TENANT_ID=9e07d1e1-xxxx-xxxx-xxxx-35da72900a82
VITE_FRONTEND_DATAVERSE_ENV=https://contoso-dev.api.crm4.dynamics.com
```

5. Start the app with `npm start`.

### Alternative: GitHub template button

If you prefer creating a new repository on GitHub first, use the GitHub template button on this repository and then clone the generated repo locally.

## Available scripts

- `npm start` starts the Vite development server.
- `npm run build` type-checks and builds the production bundle.
- `npm run lint` runs ESLint across the workspace.
- `npm test` runs the Vitest test suite.
- `npm run preview` serves the production build locally.

## What this template includes

- React 19 and TypeScript
- Vite for local development and production builds
- Fluent UI components and layout primitives
- Microsoft 365 service wiring for authentication, Graph, SharePoint, and Dataverse
- A starter landing page that reads the signed-in user and connected service data
- Built-in localization support with language persistence and browser/system fallback
- Dark mode support with theme persistence in local storage

## Localization and theme support

The app includes a lightweight localization layer that resolves strings from JSON resource files stored under `src/localization/`.

- Supported languages include: English, German, French, and Polish. You can add more by adding json file with translations to `src/localization/` and to `supportedLanguages` in `src/context/LocalizationContext.tsx`
- The active language is detected from the browser/system preference when no saved user choice exists.
- The user-selected language is stored in `localStorage` and used on subsequent loads.
- Keys follow a consistent pattern such as `common.settings`, `common.darkMode`, and `landingPage.hello`.

Dark mode follows the same pattern:

- The app prefers the system color scheme by default.
- A user can switch between light and dark mode from the app settings drawer.
- The selected theme is persisted in `localStorage` so it remains across refreshes.

## Project structure

- `src/App.tsx` wires authentication and service providers.
- `src/pages/LandingPage.tsx` contains the default landing experience.
- `src/services/` contains API wrappers for Dataverse and SharePoint.
- `src/model/` contains the TypeScript models used by the app.
- `src/components/` contains shared UI components.

## Notes

- The app expects the Vite environment variables above to be present at runtime.
- `VITE_FRONTEND_TENANT_ID` defaults to `organizations` if it is not set.
- The redirect flow uses `/redirect`, so make sure that path is allowed in your identity app registration.
