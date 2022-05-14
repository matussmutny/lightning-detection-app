import React from 'react'
import { LightningData } from '../storage'
import {
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'

const HeaderText = ({ text }: { text: string }) => (
  <Text fontSize="sm" color="grey" textTransform="uppercase">
    {text}
  </Text>
)

export const Reports = ({ data }: { data: LightningData[] }) => {
  return (
    <VStack>
      <HStack pos="fixed" justifyContent="space-between" w="full" px={6} py={2} bg="white">
        <HeaderText text="distance" />
        <HeaderText text="time" />
      </HStack>
      <TableContainer width="100vw" overflowY="auto" pt={8}>
        {data && data.length > 1 ? (
          <Table variant="striped" overflowY="auto">
            <Tbody overflowY="auto">
              {data.reverse().map(({ distance, time }) => {
                const timeDate = time instanceof Date ? time : new Date(time)
                const relativeTime = formatDistanceToNow(timeDate, { addSuffix: true })
                return (
                  <Tr key={timeDate.getTime()}>
                    <Td>{distance}km</Td>
                    <Td isNumeric>{relativeTime}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        ) : (
          <Flex justifyContent="center" alignItems="center" h="100%">
            <Text>No previous activity</Text>
          </Flex>
        )}
      </TableContainer>
    </VStack>
  )
}
