import * as React from 'react'
import { ChakraProvider, Box, theme, Center } from '@chakra-ui/react'
import { Content } from './Content'
import { Layout } from './Layout'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Layout>
          <Center>
            <Content />
          </Center>
        </Layout>
      </Box>
    </ChakraProvider>
  )
}
