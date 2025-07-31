import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, FormControl, Link, useToast, Image, Flex } from '@chakra-ui/react';
import axios from 'axios';

const LoginPage = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      // localStorage.setItem('token', JSON.stringify(response.data.data));

      toast({
        title: 'Logged in successfully.',
        description: "Welcome back!",
        status: 'success',
        duration: 7000,
        isClosable: true,
      });

      window.location.href = '/';

    } catch (error) {
      toast({
        title: 'Error logging in',
        description: error.response?.data || "An error occurred while logging in.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex 
      direction={{ base: "column", md: "row" }} 
      align="center" 
      justify="center" 
      minH="100vh" 
      bg="gray.900" 
      p={{ base: 4, md: 8 }}
    >
      <Flex 
        direction="column" 
        align={{ base: "center", md: "flex-start" }} 
        mb={{ base: 8, md: 0 }} 
        mr={{ base: 0, md: 12 }}
        maxW={{ base: "100%", md: "400px" }}
        w="100%"
      >
        <Image src="https://firebasestorage.googleapis.com/v0/b/sharefun-dc053.appspot.com/o/media%2Fimages%2Ffavicon2.png?alt=media&token=5cb32fc8-bd6d-4c81-8d75-ff5b642c0634" 
               alt="Quill Logo" 
               boxSize={{ base: "80px", md: "120px" }} 
               mb={4} 
        />
        <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" color="teal.400">QuillConnect</Text>
        <Text fontSize={{ base: "lg", md: "xl" }} mt="4" color="gray.300" textAlign={{ base: "center", md: "left" }}>
          Connect with friends and the world around you on QuillConnect.
        </Text>
      </Flex>

      <Box 
        p={8} 
        bg="gray.800" 
        rounded="md" 
        shadow="md" 
        w={{ base: "100%", md: "400px" }} 
        maxW="400px"
        mt={{ base: 4, md: 0 }}
      >
        <VStack spacing={6}>
          <Text fontSize="2xl" fontWeight="bold" color="teal.400">Log In</Text>
          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <VStack spacing={4} align="stretch">
              <FormControl id="email">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  bg="gray.700"
                  color="gray.300"
                  size="lg"
                />
              </FormControl>

              <FormControl id="password">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  bg="gray.700"
                  color="gray.300"
                  size="lg"
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" size="lg" width="full">
                Log In
              </Button>
            </VStack>
          </form>

          <Link color="blue.400" fontSize="sm">Forgot Password?</Link>

          <Button colorScheme="green" size="lg" width="full" onClick={() => window.location.href='/register'}>
            Create a New Account
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;