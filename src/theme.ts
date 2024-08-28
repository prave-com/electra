'use client'

import { createTheme } from '@mui/material/styles'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const theme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
})

export default theme
