import AuthWrapper from '@/context/auth-wrapper'
import theme from '@/context/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import * as React from 'react'

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AuthWrapper>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AuthWrapper>
      </body>
    </html>
  )
}
