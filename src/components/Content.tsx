import React, { useEffect, useState } from 'react'
import { BluetoothReturn } from '../bluetooth'
import { Box, Text, useToast, VStack } from '@chakra-ui/react'
import { useLightningDataStorage } from '../storage'
import { CurrentReport } from './CurentReport'
import { Reports } from './Reports'
import { Page, PAGE, REFUSE_TO_CHOOSE_DEVICE, TODAY } from '../constants'
import { Map } from './Map'
import { differenceInHours } from 'date-fns'
import { Charts } from './Charts'
import { NoActivity } from './NoActivity'

export const Content = ({
  bluetooth,
  page,
  setPage
}: {
  bluetooth: BluetoothReturn
  page: string
  setPage: (value: Page) => void
}) => {
  const { isConnected, error } = bluetooth
  const { data } = useLightningDataStorage()
  const [dataCount, setDataCount] = useState(data.length)
  const toast = useToast()

  useEffect(() => {
    if (error && error?.message !== REFUSE_TO_CHOOSE_DEVICE) {
      toast({
        position: 'top',
        title: 'Connection Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }, [error])

  useEffect(() => {
    if (isConnected) {
      toast({
        position: 'top',
        title: 'Connection Succeeded',
        description: 'Connection to device was successful',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    }
  }, [isConnected])

  useEffect(() => {
    console.log(dataCount, data.length)
    console.log(page)
    if (dataCount < data.length && page === PAGE.MAP) {
      toast({
        position: 'top',
        title: 'New Activity detected',
        description: 'New lightning activity was detected nearby',
        status: 'info',
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => {
          setPage(PAGE.HOME)
        }
      })
      setDataCount(data.length)
    }
  }, [data])
  console.log({ dataAdded: dataCount })
  console.log(document.fullscreenElement)

  switch (page) {
    case PAGE.HOME:
      return (
        <VStack>
          {data?.length && differenceInHours(TODAY, new Date(data[data.length - 1].time)) < 1 ? (
            <CurrentReport data={data[data.length - 1]} />
          ) : (
            <NoActivity />
          )}
        </VStack>
      )
    case PAGE.HISTORY:
      return <Reports data={data} />
    case PAGE.MAP:
      return (
        <Box height="100%" width="100%" overflow="hidden">
          <Map data={data} />
        </Box>
      )
    case PAGE.GRAPHS:
      return <Charts data={data} />
    default:
      return (
        <VStack>
          <Text>Nothing</Text>
        </VStack>
      )
  }
}
