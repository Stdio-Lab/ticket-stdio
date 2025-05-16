import { Box, VStack, Heading, Text, ScrollView } from "@gluestack-ui/themed"
import { StatusBar } from "expo-status-bar"
import FeaturedCard from "../../components/ui/FeatureCard"

export default function HomeScreen() {
  return (
    <ScrollView>
      <StatusBar style="auto" />
      <Box flex={1}>
        <VStack >
          <Heading >Pantalla Principal</Heading>
          <Text>Bienvenido a la aplicación. Esta es la pantalla de inicio.</Text>

          <FeaturedCard title="Contenido destacado" bgColor="$primary200" />

          <FeaturedCard title="Más contenido" bgColor="$secondary200" />

          <FeaturedCard title="Otro contenido" bgColor="$tertiary200" />
        </VStack>
      </Box>
    </ScrollView>
  )
}
