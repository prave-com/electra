import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Image
            src="/images/logo/electra.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <Typography
            component="h1"
            variant="h5"
            sx={{
              marginLeft: '0.5rem',
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            Electra
          </Typography>
        </Box>
      </Link>
    </Box>
  )
}
