import React from 'react'
import { LightningData } from './storage'
import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'

export const Reports = ({ data }: { data: LightningData[] }) => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Distance</Th>
            <Th isNumeric>Time</Th>
          </Tr>
        </Thead>
      </Table>
      <TableContainer width="100vw" h="50vh" overflowY="auto">
        {data && data.length > 1 ? (
          <Table variant="striped" overflowY="auto">
            <Tbody overflowY="auto">
              {data
                .slice(0, -1)
                .reverse()
                .map(({ distance, time }) => {
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
    </TableContainer>
  )
}
