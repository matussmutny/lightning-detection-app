import React from 'react'
import { Navbar } from './Navbar'
import { Box, Center } from '@chakra-ui/react'
import { BluetoothReturn } from '../bluetooth'
import { Content } from './Content'
import { Page } from '../constants'

export const Layout = ({
  bluetooth,
  page,
  updatePage
}: {
  bluetooth: BluetoothReturn
  page: string
  updatePage: (value: Page) => void
}) => {
  return (
    <Box h="100vh">
      <Navbar
        isConnected={bluetooth.isConnected}
        isLoading={bluetooth.isLoading}
        onClick={bluetooth.onClick}
        reset={bluetooth.reset}
        value={bluetooth.value}
        page={page}
        updatePage={updatePage}
      />
      <Box pt="60px">
        <Center>
          <Content bluetooth={bluetooth} page={page} setPage={updatePage} />
        </Center>
      </Box>
    </Box>
  )
}
