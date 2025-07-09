import { Box, Text, VStack, Heading, Center } from "@gluestack-ui/themed"

export default function UserScreen() {
  return (
    <Box flex={1} bg="$backgroundLight50">
      <Center flex={1}>
        <VStack space="md" alignItems="center">
          <Heading size="xl">Usuario</Heading>
          <Text>Tu perfil de usuario</Text>
        </VStack>
      </Center>
    </Box>
  )
}
