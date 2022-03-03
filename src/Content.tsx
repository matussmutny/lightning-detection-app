import React from 'react'
import { useBluetooth } from './bluetooth'
import { Button, Spinner, Text } from '@chakra-ui/react'

export const Content = () => {
  const { value, isLoading, loadingStatus, error, onClick, reset } = useBluetooth()

  console.log(isLoading)

  if (error) {
    return (
      <>
        <Text color="red">{error.message}</Text>
        <Button onClick={reset}>Try again</Button>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Spinner />
        <Text>{loadingStatus}</Text>
      </>
    )
  }

  return (
    <>
      {!loadingStatus && <Button onClick={onClick}>Connect Device</Button>}
      {value && <Text>{value}</Text>}
      <Button onClick={reset}>Try again</Button>
    </>
  )
}
