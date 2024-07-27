import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

type Props = {
  children: React.ReactNode
}

export const ViewLayout = ({ children }: Props) => {
  return (
    <View className={`min-h-screen bg-primary flex flex-col items-center`}>
      <StatusBar style="light" backgroundColor="#161622" />
      {children}
    </View>
  )
}
