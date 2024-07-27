import { Text, Pressable, View, ActivityIndicator } from 'react-native'

interface Props {
  isLoading?: boolean
  children: React.ReactNode
  onPress?: () => void
  className?: string
  variant?: 'default' | 'reversed'
}

export default function Touch({
  isLoading = false,
  children,
  onPress,
  className,
  variant = 'default',
}: Props) {
  const bgColor = variant === 'default' ? 'bg-black' : 'bg-secondary'
  const bgPressed = variant === 'default' ? 'bg-secondary-500' : 'bg-black-100'
  const textColor = variant === 'default' ? 'white' : 'black'
  const textColorPressed = variant === 'default' ? 'white' : 'gray-400'

  return (
    <Pressable onPress={onPress} disabled={isLoading}>
      {({ pressed }) => (
        <View
          className={`${pressed ? bgPressed : bgColor} p-3 rounded-xl ${className}`}
        >
          {isLoading ? (
            <ActivityIndicator
              color={pressed ? textColorPressed : textColor}
              size="small"
            />
          ) : (
            <Text
              className={`text-${pressed ? textColorPressed : textColor} text-center text-md font-bold`}
            >
              {children}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  )
}
