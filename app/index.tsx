import { useAuth } from '@/providers/AuthProvider'
import { Link, Redirect } from 'expo-router'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function IndexView() {
  const { isLoading, isAuthenticated } = useAuth()

  if (!isLoading && isAuthenticated) return <Redirect href="/workspaces" />

  return (
    <SafeAreaView>
      <Text>Aloh</Text>

      <Link href="workspaces">Go to Workspaces</Link>
      <Link href="sign-in">Go to Login</Link>
    </SafeAreaView>
  )
}
