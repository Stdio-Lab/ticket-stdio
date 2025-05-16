import { Box, Text, VStack, Heading, Center } from "@gluestack-ui/themed"

export default function TicketsScreen() {
  return (
    <Box flex={1} bg="$backgroundLight50">
      <Center flex={1}>
        <VStack space="md" alignItems="center">
          <Heading size="xl">Mis Tickets</Heading>
          <Text>Aquí verás tus tickets</Text>
        </VStack>
      </Center>
    </Box>
  )
}
