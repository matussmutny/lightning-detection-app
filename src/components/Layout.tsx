import React, { ReactChild } from 'react'
import { Navbar } from './Navbar'
import { Box } from '@chakra-ui/react'

export const Layout = ({ children }: { children: ReactChild }) => {
  return (
    <Box maxH="100vh">
      <Navbar />
      <Box pt="60px">{children}</Box>
    </Box>
  )
}
