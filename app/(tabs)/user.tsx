import { Box, Text, VStack, Heading, Center, Avatar, HStack } from "@gluestack-ui/themed"
import { useAuth } from "../auth/context/AuthContext"


export default function UserScreen() {
  const { employee, user } = useAuth();
  if (!employee) return <Text>Cargando...</Text>;

  return (
    // <Box flex={1} bg="$backgroundLight50">
    //   <Center flex={1}>
    //     <VStack space="md" alignItems="center">
    //       <Heading size="xl">Usuario</Heading>
    //       <Text>Tu perfil de usuario</Text>
    //     </VStack>
    //   </Center>
    // </Box>
    <Box flex={1}>
      <VStack  alignItems="center">
        <Avatar

        />
        <Heading >Nombre de Usuario: {employee?.name}</Heading>
        <Text>{user?.email}</Text>

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
