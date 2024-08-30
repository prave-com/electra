import { auth } from '@/auth'
import theme from '@/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react'
import * as React from 'react'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="id">
        <body>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
