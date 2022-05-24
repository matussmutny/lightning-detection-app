import React from 'react'
import { LightningData } from '../storage'
import { Icon, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { GiLightningStorm } from 'react-icons/all'
import { useRefresh } from './refresh'
import { ReportDetail } from './ReportDetail'

export const CurrentReport = ({ data }: { data: LightningData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  useRefresh()
  const distance = data?.distance
  const time = data?.time || 0
  const timeDate = time instanceof Date ? time : new Date(time)
  const relativeTime = formatDistanceToNow(timeDate, { addSuffix: true })

  return (
    <>
      <VStack h="calc(100vh - 180px)" alignItems="center" justifyContent="center" fontSize="2xl">
        <VStack as={'button'} onClick={() => onOpen()}>
          <Icon as={GiLightningStorm} w={56} h={56} />
          <Text>Lightning detected {distance}km away!</Text>
          <Text>{relativeTime}</Text>
        </VStack>
      </VStack>
      <ReportDetail disclosure={{ isOpen, onOpen, onClose }} reportData={data} />
    </>
  )
}
