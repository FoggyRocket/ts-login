import {
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const DashBoard = () => {
  return (
    <Container maxW="md" py={8} centerContent>
      <Stack align="center">
        <Image
          borderRadius="full"
          boxSize="120px"
          src="https://cdn-images.dzcdn.net/images/artist/b9da8e2e83b922b668ba664b9bf28094/1900x1900-000000-80-0-0.jpg"
          alt="User Profile"
        />
        <Heading size="lg">John Doe</Heading>
        <Stack align="center">
          <Text fontSize="md" color="gray.600">
            Correo: john.doe@example.com
          </Text>
          <Text fontSize="md" color="gray.600">
            Teléfono: +1234567890
          </Text>
          <Text fontSize="md" color="gray.600">
            Ubicación: Ciudad, País
          </Text>
        </Stack>
        <Button colorScheme="blue" size="md">
          Editar Perfil
        </Button>
      </Stack>
    </Container>
  );
};

export default DashBoard;
