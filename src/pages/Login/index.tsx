import {
  Button,
  Input,
  VStack,
  Box,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Field } from "../../components/ui";
import { loginSchema } from "../../utils/validationSchemas";
import { Bounce, toast } from "react-toastify";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    // Check for demo credentials
    if (data.email === "demo@gmail.com" && data.password === "123456") {
      console.log("Login successful", data);
      toast.success("Login successful 🚀", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
    } else {
      // Set form errors for invalid credentials
      toast.error("Credenciales inválidas!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setError("email", {
        type: "manual",
        message: "Credenciales inválidas",
      });
      setError("password", {
        type: "manual",
        message: "Credenciales inválidas",
      });
    }
  };
  return (
    <Flex align="center" justify={"center"} className="container">
      <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading mb={6}>Login</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={4}>
            <Box>
              <Field
                label="Email"
                errorText={
                  <Text color="red.500">{errors?.email?.message}</Text>
                }
              >
                <Input type="email" {...register("email")} />
              </Field>
            </Box>

            <Box>
              <Field
                label="Contraseña"
                errorText={
                  <Text color="red.500">{errors?.password?.message}</Text>
                }
              >
                <Input type="password" {...register("password")} />
              </Field>
            </Box>

            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Iniciar sesión
            </Button>
            
            <Text>
              ¿No tienes una cuenta?{" "}
              <Text
                as="span"
                color="blue.400"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={() => navigate("/signup")}
              >
                Regístrate aquí
              </Text>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
