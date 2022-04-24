import React from 'react'
import { LightningData } from './storage'
import { Text, VStack } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'

export const CurentReport = ({ data }: { data: LightningData }) => {
  const { distance, time } = data
  const timeDate = time instanceof Date ? time : new Date(time)
  const relativeTime = formatDistanceToNow(timeDate, { addSuffix: true })
  return (
    <VStack h="40vh" alignItems="center" justifyContent="center" fontSize="2xl">
      <Text>Lightning detected {distance}km away!</Text>
      <Text>{relativeTime}</Text>
    </VStack>
  )
}
