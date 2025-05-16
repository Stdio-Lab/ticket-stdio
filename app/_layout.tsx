import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="auto" />
      <Slot />
    </GluestackUIProvider>
  )
}
