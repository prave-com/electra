'use client'

import login from '@/actions/login'
import { LoginSchema } from '@/schema/login'
import { zodResolver } from '@hookform/resolvers/zod'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

function SignInBody() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use in different provider!'
      : ''

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(urlError)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setErrorMessage(null)
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setErrorMessage(null)

    try {
      const result = await login(values, callbackUrl)
      if (result.error) {
        setErrorMessage(result.error)
      }
    } catch (error) {
      setErrorMessage('Something went wrong!')
    }
  }

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: {
          xs: '1rem',
          sm: '0',
        },
        width: {
          xs: '100%',
          sm: '75%',
          md: '50%',
          lg: '25%',
          xl: '20%',
        },
      }}
    >
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Typography component="h2" variant="h5" sx={{ fontWeight: 600 }}>
        Masuk ke Electra
      </Typography>

      <Button
        type="button"
        variant="outlined"
        size="large"
        sx={{
          borderRadius: '2rem',
          marginTop: '2rem',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
        onClick={() => signIn('google')}
      >
        <Image
          src="/images/logo/google.svg"
          alt="Google Logo"
          width={18}
          height={18}
        />
        Masuk dengan Google
      </Button>

      <Divider sx={{ fontWeight: 400, fontSize: '0.9rem', marginY: '1.5rem' }}>
        atau masuk dengan email
      </Divider>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            {...register('email')}
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          <TextField
            {...register('password')}
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            size="large"
            sx={{
              borderRadius: '2rem',
              textTransform: 'none',
            }}
          >
            Masuk
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default function SignInForm() {
  return (
    <Suspense>
      <SignInBody />
    </Suspense>
  )
}
