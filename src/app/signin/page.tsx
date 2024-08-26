import Navbar from '@/components/signin/navbar'
import SignInForm from '@/components/signin/sign-in-form'
import Box from '@mui/material/Box'

export default function Page() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Navbar />
      <SignInForm />
    </Box>
  )
}
