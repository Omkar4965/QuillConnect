import React, { useState } from 'react';
import { Box, Button, Input, Stack, Text, FormControl, Link, useToast } from '@chakra-ui/react';
import axios from 'axios';

const LoginPage = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("User Info: ", { email, password });

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });


   
      console.log("User Data: ", response.data.data);
    localStorage.setItem('userId', JSON.stringify(response.data.data));

      // Show success toast if login is successful
      toast({
        title: 'Logged in successfully.',
        description: "Welcome back!",
        status: 'success',
        duration: 7000,
        isClosable: true,
      });

      // Redirect to the homepage after successful login
      window.location.href = '/';
      

    } catch (error) {
      console.log("Error Response: ", error.response);

      // Show error toast if login fails
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
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bg="gray.900">
      <Stack direction="row" spacing={10} align="center">
        <Box>
          <Text fontSize="5xl" fontWeight="bold" color="teal.400">ShareFun</Text>
          <Text fontSize="2xl" mt="4" color="gray.300">Connect with friends and the world around you on ShareFun.</Text>
        </Box>

        <Box p={8} pt={5} rounded="md" shadow="2xl" width="350px" bg="gray.800" textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" color="teal.400">Log In</Text>
          <Text fontSize="xl" color="teal.400">To continue being social</Text>

          <form onSubmit={submitHandler}>
            <Stack spacing={4}>
              <FormControl id="email">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  bg="gray.700"
                  color="gray.300"
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
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" size="md" width="full">Log In</Button>

              <Link color="blue.400" textAlign="center" fontSize="sm">Forgot Password?</Link>

              <Button colorScheme="green" size="md" width="full" onClick={() => window.location.href='/register'}>
                Create a New Account
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginPage;
