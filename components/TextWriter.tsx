import { View, TextInput, Alert, Image } from 'react-native'
import type { TextInputProps } from 'react-native'

import { Write } from './Write'
import { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import icons from '@/constants/icons'
type Props = {
  isEditing?: boolean
  className?: string
  placeholder?: string
  name: string
  value: string
  type: 'text' | 'password' | 'email'
} & TextInputProps

export default function TextWriter({
  isEditing = false,
  className,
  name,
  placeholder,
  value,
  type,
  ...restOfProps
}: Props) {
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    } else {
      inputRef.current?.blur()
    }
  }, [isEditing])

  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <View className={`flex flex-col ${className} mb-4`}>
      <Write className="mb-1">{name}</Write>
      <View className="flex flex-row items-center min-w-full border  border-secondary p-2 rounded-lg">
        <TextInput
          className={`font-bold text-white flex-1 text-md placeholder:text-white`}
          placeholder={placeholder}
          placeholderTextColor={'#999'}
          value={value}
          secureTextEntry={type === 'password' && !showPassword}
          cursorColor={'#eee'}
          selectionColor={'#666'}
          ref={inputRef}
          inputMode={
            type === 'email' ? 'email' : type === 'text' ? 'text' : 'text'
          }
          {...restOfProps}
        />
        {type === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
