import React from 'react'
import { Icon, Text, VStack } from '@chakra-ui/react'
import { FaCloudSun } from 'react-icons/all'

export const NoActivity = () => {
  return (
    <VStack h="calc(100vh - 180px)" justifyContent="center">
      <Icon as={FaCloudSun} w={56} h={56} />
      <Text fontSize="3xl">No recent activity</Text>
    </VStack>
  )
}
