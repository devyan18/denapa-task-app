import { Text } from 'react-native'

type Props = {
  children: React.ReactNode
  type?: 'paragraph' | 'heading' | 'title'
  color?: 'primary' | 'secondary'
  className?: string
}

export const Write = ({
  children,
  type,
  color = 'primary',
  className,
}: Props) => {
  return (
    <Text
      className={`
      ${
        type === 'heading'
          ? 'text-xl font-bold'
          : type === 'title'
            ? 'text-3xl font-bold'
            : 'text-base'
      }
      ${color === 'primary' ? 'text-white' : 'text-gray-50/70'}
      ${className}
    `}
    >
      {children}
    </Text>
  )
}
