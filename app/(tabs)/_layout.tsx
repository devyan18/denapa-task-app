import { Tabs } from 'expo-router'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import Touch from '@/components/Touch'
import { useAuth } from '@/providers/AuthProvider'
import { useEffect } from 'react'
import { router } from 'expo-router'

export default function TabLayout() {
  const { isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/sign-in')
    }
  }, [isLoading, isAuthenticated])

  return (
    <>
      <Tabs
        screenOptions={{
          headerRight: () => <Touch variant="default">Back</Touch>,
          headerTitle: '',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#161622',
          },
          tabBarActiveBackgroundColor: '#161622',
          tabBarInactiveBackgroundColor: '#161622',
          tabBarActiveTintColor: '#FF9C01',
          tabBarInactiveTintColor: '#999',
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="workspaces"
          options={{
            headerTitle: 'Workspaces',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="workspaces" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: 'Profile',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161616" style="light" />
    </>
  )
}
