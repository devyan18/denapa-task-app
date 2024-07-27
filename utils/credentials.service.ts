import AsyncStorage from '@react-native-async-storage/async-storage'

const CREDENTIALS_KEY = 'depana-credentials'

export class CredentialsService {
  static async getCredential(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(CREDENTIALS_KEY)
    } catch (error) {
      console.log('Error getting credentials', error)
      return null
    }
  }

  static async setCredential(credential: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(CREDENTIALS_KEY, credential)
      return true
    } catch (error) {
      console.log('Error setting credentials', error)
      return false
    }
  }

  static async clearCredentials(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(CREDENTIALS_KEY)
      return true
    } catch (error) {
      console.log('Error clearing credentials', error)
      return false
    }
  }
}
