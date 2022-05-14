import React from 'react'
import { LightningData } from '../storage'
import { Text, VStack } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'

export const CurrentReport = ({ data }: { data: LightningData }) => {
  console.log(data)
  const distance = data?.distance
  const time = data?.time || 0
  const timeDate = time instanceof Date ? time : new Date(time)
  const relativeTime = formatDistanceToNow(timeDate, { addSuffix: true })
  return (
    <VStack alignItems="center" justifyContent="center" fontSize="2xl">
      <Text>Lightning detected {distance}km away!</Text>
      <Text>{relativeTime}</Text>
    </VStack>
  )
}
