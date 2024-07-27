import { SERVER_URL } from '@/constants/server'
import { IUser } from '@/providers/AuthProvider'

type AuthResponse = {
  user: IUser
  token: string
}

export class AuthService {
  static async signIn({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    try {
      console.log({ email, password })
      console.log(SERVER_URL)
      const response = await fetch(`${SERVER_URL}/api/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      console.log({ response })
      const data = await response.json()
      console.log({ data })
      return data as AuthResponse
    } catch (error) {
      console.log('Error signing in', error)
      return null
    }
  }

  static async signUp(data: FormData) {
    try {
      const request = await fetch(`${SERVER_URL}/api/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })

      const response = await request.json()

      return response as AuthResponse
    } catch (error) {
      console.log('Error signing up', error)
      return null
    }
  }

  static async getMe(token: string) {
    try {
      const response = await fetch(`${SERVER_URL}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      return data as IUser
    } catch (error) {
      console.log('Error getting user', error)
      return null
    }
  }
}
