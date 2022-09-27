import { React, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Input,
  Button,
} from '@chakra-ui/react';



export default function Chat() {

    const username = "Ratheesh"

  return (
    <Box>
        <Text>{username}</Text>
    </Box>
  );
}