import { AuthService } from '@/services/auth.service'
import { CredentialsService } from '@/utils/credentials.service'
import { createContext, useContext, useState, useEffect } from 'react'

export interface IUser {
  id: string
  username: string
  email: string
  password: string
  avatar: string
}

interface IAuthContext {
  isAuthenticated: boolean
  isLoading: boolean
  accessToken: string | null
  user: IUser | null
  signIn: ({ accessToken, user }: { accessToken: string; user: IUser }) => void
  signOut: () => void
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  accessToken: null,
  user: null,
  signIn: () => {},
  signOut: () => {},
  isLoading: false,
})

interface Props {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<IUser | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignIn = async ({
    accessToken,
    user,
  }: {
    accessToken: string
    user: IUser
  }) => {
    setLoading(true)
    if (accessToken && user) {
      try {
        const success = await CredentialsService.setCredential(accessToken)
        if (!success) throw new Error('Failed to set credentials')

        setAccessToken(accessToken)
        setUserInfo(user)
      } catch (error) {
        console.log(error)
      }
    }

    setLoading(false)
  }

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const success = await CredentialsService.clearCredentials()
      if (!success) throw new Error('Failed to clear credentials')

      setAccessToken(null)
      setUserInfo(null)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const handleGetInitialCredentials = async () => {
    const token = await CredentialsService.getCredential()
    if (token) {
      setAccessToken(token)

      const user = await AuthService.getMe(token)
      if (!user) {
        setUserInfo(null)
        setAccessToken(null)
        return
      }

      setUserInfo(user)
    }
  }

  useEffect(() => {
    handleGetInitialCredentials()
  }, [])

  useEffect(() => {
    console.log({
      accessToken,
      userInfo,
    })
  }, [accessToken, userInfo])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        accessToken,
        signIn: handleSignIn,
        signOut: handleSignOut,
        user: userInfo,
        isLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
