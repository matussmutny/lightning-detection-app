import * as React from 'react'
import { ChakraProvider, Box, theme, Center } from '@chakra-ui/react'
import { Content } from './Content'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Center minH="100vh">
          <Content />
        </Center>
      </Box>
    </ChakraProvider>
  )
}
