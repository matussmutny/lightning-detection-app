import React from 'react'
import { useBluetooth } from './bluetooth'
import { Button, Spinner, Text, VStack } from '@chakra-ui/react'
import { useStorage } from './storage'
import { CurentReport } from './CurentReport'
import { Reports } from './Reports'

export const Content = () => {
  const { isLoading, isConnected, loadingStatus, error, onClick, reset } = useBluetooth()
  const { data } = useStorage()

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

  if (isConnected) {
    return (
      <VStack height="100vh" justifyContent="space-between" pt={4}>
        {data ? <CurentReport data={data[data.length - 1]} /> : <Text>No activity</Text>}
        <Reports data={data} />
      </VStack>
    )
  }

  return <>{!loadingStatus && <Button onClick={onClick}>Connect Device</Button>}</>
}
