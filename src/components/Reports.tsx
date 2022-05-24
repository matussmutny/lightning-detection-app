import React, { useState } from 'react'
import { LightningData } from '../storage'
import {
  Flex,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { format, formatDistanceToNow } from 'date-fns'
import { NAVBAR_COLOR } from '../constants'
import { useRefresh } from './refresh'
import { ReportDetail } from './ReportDetail'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/all'
import groupBy from 'lodash.groupby'

const HeaderText = ({ text }: { text: string }) => (
  <Text fontSize="sm" color="grey" textTransform="uppercase">
    {text}
  </Text>
)

export const Reports = ({ data }: { data: LightningData[] }) => {
  const dataByDay = groupBy(data, (activity) => format(new Date(activity.time), 'd. M. yyyy'))
  const days = Object.keys(dataByDay)
  const [day, setDay] = useState(days.length - 1)

  const dayData = dataByDay[days[day]]
  const [detailData, setDetailData] = useState<LightningData>(data[0])
  const { isOpen, onOpen, onClose } = useDisclosure()
  useRefresh()
  const reversedData = [...dayData].reverse()
  console.log({ reversedData, dayData })
  return (
    <VStack>
      <HStack pos="fixed" justifyContent="space-between" w="full" px={6} py={2} bg={NAVBAR_COLOR}>
        <HeaderText text="distance" />
        <HeaderText text="time" />
      </HStack>
      {dayData?.length ? (
        <TableContainer width="100vw" overflowY="auto" pt={8} pb="60px">
          <Table variant="simple" overflowY="auto">
            <Tbody overflowY="auto">
              {reversedData.map(({ distance, time, position }) => {
                const timeDate = time instanceof Date ? time : new Date(time)
                const relativeTime = formatDistanceToNow(timeDate, { addSuffix: true })
                return (
                  <Tr
                    key={timeDate.getTime()}
                    onClick={() => {
                      setDetailData({ distance, time, position })
                      onOpen()
                    }}
                  >
                    <Td borderColor="#aaa">{distance}km</Td>
                    <Td borderColor="#aaa" isNumeric>
                      {relativeTime}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Flex justifyContent="center" alignItems="center" h="calc(100vh - 120px)">
          <Text>No activity for selected day</Text>
        </Flex>
      )}

      <HStack
        w="full"
        h="60px"
        px={4}
        pos="fixed"
        bottom={0}
        justifyContent="space-between"
        bg={NAVBAR_COLOR}
      >
        <IconButton
          aria-label="prevDay"
          icon={<BiLeftArrowAlt size={24} />}
          bg="none"
          disabled={day === days.length - 1}
          _active={{ bg: 'none' }}
          _hover={{ bg: 'none' }}
          onClick={() => {
            setDay((prevState) => prevState + 1)
          }}
        />
        <Text>{days[day]}</Text>
        <IconButton
          aria-label="prevDay"
          icon={<BiRightArrowAlt size={24} />}
          bg="none"
          _active={{ bg: 'none' }}
          _hover={{ bg: 'none' }}
          disabled={day === 0}
          onClick={() => {
            setDay((prevState) => prevState - 1)
          }}
        />
      </HStack>
      <ReportDetail disclosure={{ isOpen, onOpen, onClose }} reportData={detailData} />
    </VStack>
  )
}
