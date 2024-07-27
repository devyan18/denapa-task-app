// import Ionicons from '@expo/vector-icons/Ionicons';
import { ViewLayout } from '@/components/ViewLayout'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'

export default function ProfileWiew() {
  return (
    <ViewLayout>
      <StatusBar style="light" />
      <Text className="text-white">ProfileWiew</Text>
    </ViewLayout>
  )
}
