import TextWriter from '@/components/TextWriter'
import Touch from '@/components/Touch'
import { ViewLayout } from '@/components/ViewLayout'
import { Write } from '@/components/Write'
import { useState } from 'react'
import {
  Button,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
// import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'
import { ScrollView } from 'react-native'
import { AuthService } from '@/services/auth.service'
import { useAuth } from '@/providers/AuthProvider'

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
  const { signIn } = useAuth()

  const [formData, setFormData] = useState<FormProps>({
    username: 'cheb1',
    email: 'clau.boga.contact@gmail.com',
    password: 'tester',
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

  // const handleUnfocus = () => {
  //   setIsFocus([false, false, false])
  // }

  // useEffect(() => {
  //   console.log(isFocus)
  // }, [isFocus])

  const [image, setImage] = useState<string | null>(null)
  const [imageType, setImageType] = useState<string | null>(null)

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (result.granted === false) {
      alert('Se necesita permiso para acceder a la galería')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (!pickerResult?.canceled) {
      console.log(pickerResult)
      const uri = pickerResult.assets[0].uri
      const type = mime.getType(uri) // Obtener el tipo MIME de la imagen

      setImage(uri)
      setImageType(type)
    }
  }

  const handleRegister = async () => {
    if (!image || !imageType) {
      alert('Primero selecciona una imagen')
      return
    }

    const form = new FormData()
    // @ts-ignore
    form.append('avatar', {
      uri: image,
      name: `avatar.${imageType.split('/')[1]}`, // Obtener la extensión del tipo MIME
      type: imageType,
    })

    form.append('username', formData.username)
    form.append('email', formData.email)
    form.append('password', formData.password)

    try {
      const response = await AuthService.signUp(form)
      if (!response) throw new Error('error to sign up')
      const { token, user } = response
      signIn({
        accessToken: token,
        user,
      })
      router.navigate('/workspaces')
    } catch (error) {
      alert('Error to sign up')
    }
  }

  return (
    <SafeAreaView>
      <ViewLayout>
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <ScrollView style={{ flex: 1, minWidth: '100%' }}>
            <View className="flex flex-col min-h-[75vh] justify-center items-center mt-24">
              <View className="min-w-full pl-12">
                <Write type="title">Sign Up</Write>
              </View>
              <View
                className="flex-1 flex flex-col mt-5"
                style={{
                  maxWidth: width - 100,
                }}
              >
                <Button
                  title="Pick an image from camera roll"
                  onPress={pickImage}
                />
                {image && (
                  <Image source={{ uri: image }} style={styles.image} />
                )}
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
          </ScrollView>
        </KeyboardAvoidingView>
      </ViewLayout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
})
