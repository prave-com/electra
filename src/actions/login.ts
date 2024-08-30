'use server'

import { signIn } from '@/auth'
import { getUserByEmail } from '@/data/user'
import { LoginSchema } from '@/schema/login'
import { AuthError } from 'next-auth'
import * as z from 'zod'

export default async function login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid credentials!' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || undefined,
    })
    return
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
