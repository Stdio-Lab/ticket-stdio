import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { AuthProvider } from "./auth/context/AuthContext"

export default function RootLayout() {
  return (
  <AuthProvider>
    <GluestackUIProvider config={config}>
      <StatusBar style="auto" />
      <Slot />
    </GluestackUIProvider>
  </AuthProvider>
  )
}
