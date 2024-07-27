import TextWriter from '@/components/TextWriter'
import Touch from '@/components/Touch'
import { ViewLayout } from '@/components/ViewLayout'
import { Write } from '@/components/Write'
import { useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { AuthService } from '@/services/auth.service'
import { useAuth } from '@/providers/AuthProvider'

type FormProps = {
  email: string
  password: string
}

type HandleChange = {
  key: 'email' | 'password'
  value: string
}

export default function SignInView() {
  const { signIn } = useAuth()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [formData, setFormData] = useState<FormProps>({
    email: 'ruarruar17@gmail.com',
    password: 'tester',
  })

  const handleChangeFormData = ({ key, value }: HandleChange) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  const { width } = useWindowDimensions()

  const [isFocus, setIsFocus] = useState<boolean[]>([true, false])

  const handleChangeFocus = (input: number) => {
    const newFocus = isFocus.map((_, index) => index === input)
    setIsFocus(newFocus)
  }

  const handleUnfocus = () => {
    setIsFocus([false, false])
  }

  const handleLogin = async () => {
    handleUnfocus()
    try {
      setIsLoading(true)
      const data = await AuthService.signIn(formData)

      if (!data) {
        return console.log('Error signing in')
      }

      signIn({
        accessToken: data.token,
        user: data.user,
      })

      console.log('Signed in')

      router.replace('/workspaces')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView>
      <ViewLayout>
        <View className="flex flex-col min-h-[75vh] justify-center">
          <Write type="title">Sign In</Write>
          <View
            className="flex flex-col mt-5"
            style={{
              maxWidth: width - 100,
            }}
          >
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
              autoCapitalize={'none'}
              onSubmitEditing={() => handleChangeFocus(1)}
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
              isEditing={isFocus[1]}
              onSubmitEditing={() => handleLogin()}
            />
            <View className="mt-4 flex flex-col">
              <Touch
                className="mt-5"
                variant="reversed"
                onPress={() => handleLogin()}
                isLoading={isLoading}
              >
                Login
              </Touch>
              <Write>
                I Don't have account{' '}
                <Link href="/sign-up" className="text-blue-500">
                  Sign Up
                </Link>
              </Write>
            </View>
          </View>
        </View>
      </ViewLayout>
    </SafeAreaView>
  )
}
