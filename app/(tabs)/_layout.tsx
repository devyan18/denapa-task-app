import { Tabs } from 'expo-router'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import Touch from '@/components/Touch'
import { useAuth } from '@/providers/AuthProvider'
import { useEffect } from 'react'
import { router } from 'expo-router'
import { Image, View } from 'react-native'

export default function TabLayout() {
  const { isLoading, isAuthenticated, signOut, user } = useAuth()
  const handleLogout = () => {
    signOut()
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/sign-in')
    }
  }, [isLoading, isAuthenticated])

  return (
    <>
      <Tabs
        screenOptions={{
          headerLeft: () => {
            if (!user?.avatar) return null
            console.log(user)
            return (
              <View className="flex ml-2">
                <Image
                  source={{
                    uri: user.avatar,
                    cache: 'force-cache',
                  }}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </View>
            )
          },
          headerRight: () => (
            <Touch variant="default" onPress={handleLogout}>
              Logout
            </Touch>
          ),
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
