import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { IdPrefixProvider } from '@fluentui/react-components'
import { ThemeProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <IdPrefixProvider value="mgwdev-m365-app">
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </IdPrefixProvider>,
)
