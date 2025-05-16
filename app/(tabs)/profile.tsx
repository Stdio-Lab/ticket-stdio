import { Box, VStack, Heading, Text, Avatar, HStack } from "@gluestack-ui/themed"

export default function ProfileScreen() {
  return (
    <Box flex={1}>
      <VStack  alignItems="center">
        <Avatar

        />
        <Heading >Nombre de Usuario</Heading>
        <Text>usuario@ejemplo.com</Text>

        <Box bg="$coolGray100" p={4} borderRadius={8}>
          <HStack justifyContent="space-between">
            <Text>Publicaciones</Text>
            <Text fontWeight="bold">24</Text>
          </HStack>
        </Box>

        <Box w="100%" bg="$coolGray100" p={4} borderRadius={8}>
          <HStack justifyContent="space-between">
            <Text>Seguidores</Text>
            <Text fontWeight="bold">1,024</Text>
          </HStack>
        </Box>

        <Box w="100%" bg="$coolGray100" p={4} borderRadius={8}>
          <HStack justifyContent="space-between">
            <Text>Siguiendo</Text>
            <Text fontWeight="bold">86</Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  )
}
