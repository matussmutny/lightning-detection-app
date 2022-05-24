import * as React from 'react'
import { useState } from 'react'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { Layout } from './Layout'
import theme from '../theme'
import { useBluetooth } from '../bluetooth'
import { PAGE, Page } from '../constants'

export const App = () => {
  const [page, setPage] = useState<Page>(PAGE.HOME)
  const bluetooth = useBluetooth()
  if (Notification.permission === 'denied' || Notification.permission === 'default') {
    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status)
    }).then((permission) => {
      console.log('Notification permission status:', permission)
    })
  }
  const updatePage = (value: Page) => {
    setPage(value)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Layout bluetooth={bluetooth} page={page} updatePage={updatePage} />
      </Box>
    </ChakraProvider>
  )
}
