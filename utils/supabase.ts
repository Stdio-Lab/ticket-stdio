
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, Platform } from 'react-native'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: Platform.OS === 'web' ? undefined : AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      // lock: processLock,
    },
  })
        
  
export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log('Error en login:', error.message)
    Alert.alert('Error', error.message)
    return null
  }

  console.log('Usuario logueado:', data)
  return data
}

export async function signin(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.log('Error en login:', error.message)
    Alert.alert('Error', error.message)
    return null
  }

  console.log('Usuario Creado:', data)
  return data
}