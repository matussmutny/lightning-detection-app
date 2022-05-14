import React from 'react'
import { useBluetooth } from '../bluetooth'
import { Button, Spinner, Text, VStack } from '@chakra-ui/react'
import { useLightningDataStorage, usePageStorage } from '../storage'
import { CurrentReport } from './CurentReport'
import { Reports } from './Reports'
import { PAGE } from '../constants'

const testingData = [
  { distance: 6, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) },
  { distance: 4, time: new Date(213232321) }
]

export const Content = () => {
  const { isLoading, isConnected, loadingStatus, error, onClick, reset } = useBluetooth()
  const { data } = useLightningDataStorage()
  const { page } = usePageStorage()

  if (error) {
    return (
      <VStack>
        <Text color="red" textAlign="center">
          {error.message}
        </Text>
        <Button onClick={reset}>Try again</Button>
      </VStack>
    )
  }

  if (isLoading) {
    return (
      <VStack>
        <Spinner />
        <Text>{loadingStatus}</Text>
      </VStack>
    )
  }

  switch (page) {
    case PAGE.HOME:
      return (
        <VStack>
          {data ? (
            <CurrentReport data={testingData[testingData.length - 1]} />
          ) : (
            <Text>No activity</Text>
          )}
        </VStack>
      )
    case PAGE.CONNECTION:
      return <>{!loadingStatus && <Button onClick={onClick}>Connect Device</Button>}</>
    case PAGE.HISTORY:
      return <Reports data={testingData} />
    default:
      return (
        <VStack>
          {data ? <CurrentReport data={data[data.length - 1]} /> : <Text>No activity</Text>}
        </VStack>
      )
  }

  return (
    <VStack>
      {data ? <CurrentReport data={data[data.length - 1]} /> : <Text>No activity</Text>}
    </VStack>
  )

  return <>{!loadingStatus && <Button onClick={onClick}>Connect Device</Button>}</>
}
