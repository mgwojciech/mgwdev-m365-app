import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { FluentProvider, webLightTheme, IdPrefixProvider } from '@fluentui/react-components'

createRoot(document.getElementById('root')!).render(
  <IdPrefixProvider value="mgwdev-m365-app">
    <FluentProvider theme={webLightTheme} targetDocument={document} applyStylesToPortals>
      <App />
    </FluentProvider>
  </IdPrefixProvider>,
)
