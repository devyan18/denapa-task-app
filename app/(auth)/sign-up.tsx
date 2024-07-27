import TextWriter from '@/components/TextWriter'
import Touch from '@/components/Touch'
import { ViewLayout } from '@/components/ViewLayout'
import { Write } from '@/components/Write'
import { useEffect, useRef, useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { TextInput as TI } from 'react-native'
import { Link } from 'expo-router'

type FormProps = {
  username: string
  email: string
  password: string
}

type HandleChange = {
  key: 'username' | 'email' | 'password'
  value: string
}

export default function SignUpView() {
  const [formData, setFormData] = useState<FormProps>({
    username: '',
    email: '',
    password: '',
  })

  const handleChangeFormData = ({ key, value }: HandleChange) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  const { width } = useWindowDimensions()

  const [isFocus, setIsFocus] = useState<boolean[]>([true, false, false])

  const handleChangeFocus = (input: number) => {
    const newFocus = isFocus.map((_, index) => index === input)
    setIsFocus(newFocus)
  }

  const handleUnfocus = () => {
    setIsFocus([false, false, false])
  }

  // useEffect(() => {
  //   console.log(isFocus)
  // }, [isFocus])

  const handleRegister = () => {
    handleUnfocus()
    console.log('Register')
  }

  return (
    <SafeAreaView>
      <ViewLayout>
        <View className="flex flex-col min-h-[75vh] justify-center">
          <Write type="title">Sign Up</Write>
          <View
            className="flex flex-col mt-5"
            style={{
              maxWidth: width - 100,
            }}
          >
            <TextWriter
              type="text"
              name="Username"
              placeholder="Eru1220"
              value={formData.username}
              autoCapitalize="sentences"
              onChangeText={(value: string) =>
                handleChangeFormData({ key: 'username', value })
              }
              enterKeyHint="next"
              onSubmitEditing={() => handleChangeFocus(1)}
              isEditing={isFocus[0]}
              blurOnSubmit={false}
              selectTextOnFocus
            />
            <TextWriter
              selectTextOnFocus
              type="email"
              name="Email"
              placeholder="example@text.com"
              value={formData.email}
              keyboardType="email-address"
              blurOnSubmit={false}
              onChangeText={(value: string) =>
                handleChangeFormData({ key: 'email', value })
              }
              onSubmitEditing={() => handleChangeFocus(2)}
              enterKeyHint="next"
              isEditing={isFocus[1]}
            />
            <TextWriter
              type="password"
              name="Password"
              placeholder="****************"
              value={formData.password}
              selectTextOnFocus
              blurOnSubmit={false}
              onChangeText={(value: string) =>
                handleChangeFormData({ key: 'password', value })
              }
              returnKeyType="done"
              isEditing={isFocus[2]}
              onSubmitEditing={handleRegister}
            />
            <View className="mt-4 flex flex-col">
              <Touch
                className="mt-5"
                variant="reversed"
                onPress={handleRegister}
                isLoading={false}
              >
                Register
              </Touch>
              <Write>
                I have account{' '}
                <Link href="/sign-in" className="text-blue-500">
                  Sign In
                </Link>
              </Write>
            </View>
          </View>
        </View>
      </ViewLayout>
    </SafeAreaView>
  )
}
