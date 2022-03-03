import * as React from 'react'
import { ChakraProvider, Box, Grid, theme, Button } from '@chakra-ui/react'
import { requestDevice } from './bluetooth'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Button onClick={requestDevice}>Connect Device</Button>
      </Grid>
    </Box>
  </ChakraProvider>
)
