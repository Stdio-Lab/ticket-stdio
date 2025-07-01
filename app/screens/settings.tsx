import { Box, Text, VStack, Heading, Center } from "@gluestack-ui/themed"

export default function SettingsScreen() {
  return (
    <Box flex={1} bg="$backgroundLight50">
      <Center flex={1}>
        <VStack space="md" alignItems="center">
          <Heading size="xl">Ajustes</Heading>
          <Text>Configura tu aplicación</Text>
        </VStack>
      </Center>
    </Box>
  )
}
