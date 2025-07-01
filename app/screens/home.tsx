import { Box, Text, VStack, Heading, Center } from "@gluestack-ui/themed"

export default function HomeScreen() {
  return (
    <Box flex={1} bg="$backgroundLight50">
      <Center flex={1}>
        <VStack space="md" alignItems="center">
          <Heading size="xl">Inicio</Heading>
          <Text>Bienvenido a la aplicación</Text>
        </VStack>
      </Center>
    </Box>
  )
}
