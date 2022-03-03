import * as React from 'react'
import { ChakraProvider, Box, theme, Center, VStack } from '@chakra-ui/react'
import { Content } from './Content'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="xl">
      <Center minH="100vh" p={3}>
        <VStack>
          <Content />
        </VStack>
      </Center>
    </Box>
  </ChakraProvider>
)
