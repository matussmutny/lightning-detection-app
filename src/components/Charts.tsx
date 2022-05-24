import React, { useState } from 'react'
import { Bar, Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Title,
  BarElement
} from 'chart.js'
import { LightningData } from '../storage'
import { format } from 'date-fns'
import groupBy from 'lodash.groupby'
import { Center, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/all'
import { LIGHT_GRAY_COLOR, NAVBAR_COLOR } from '../constants'

ChartJS.register(LinearScale, PointElement, LineElement, CategoryScale, BarElement, Title)

export const Charts = ({ data }: { data: LightningData[] }) => {
  if (!data.length) {
    return (
      <Center h="calc(100vh - 120px)">
        <Text>Unable to show charts without data</Text>
      </Center>
    )
  }
  const dataByDay = groupBy(data, (activity) => format(new Date(activity.time), 'd. M. yyyy'))
  const days = Object.keys(dataByDay)
  const [day, setDay] = useState(days.length - 1)

  const dayData = dataByDay[days[day]]
  const dataByDistance = groupBy(dayData, (activity) => activity.distance)

  const scatterData = {
    datasets: [
      {
        data: dayData.map(({ distance, time }) => {
          const timeDate = time instanceof Date ? time : new Date(time)
          return {
            y: distance,
            x: timeDate.getUTCHours() + 1
          }
        }),
        backgroundColor: '#eee'
      }
    ]
  }
  const barData = {
    labels: Object.keys(dataByDistance),
    datasets: [
      {
        data: Object.entries(dataByDistance).map(([key, value]) => ({
          y: value.length,
          x: parseInt(key)
        })),
        backgroundColor: '#eee',
        color: 'green'
      }
    ]
  }
  return (
    <VStack>
      <VStack spacing={8} h="calc(100vh - 120px)" justifyContent="center">
        <Scatter
          style={{ width: '100%' }}
          data={scatterData}
          options={{
            scales: {
              x: {
                min: 0,
                max: 23,
                offset: true,
                ticks: { color: LIGHT_GRAY_COLOR },
                grid: { color: LIGHT_GRAY_COLOR }
              },
              y: {
                ticks: {
                  // @ts-ignore
                  beginAtZero: true,
                  callback: function (value) {
                    // @ts-ignore
                    if (value % 1 === 0) {
                      return value
                    }
                  },
                  color: LIGHT_GRAY_COLOR
                },
                grid: { color: LIGHT_GRAY_COLOR }
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Distance / Day Hour',
                color: LIGHT_GRAY_COLOR,
                font: { size: 18 }
              }
            },
            borderColor: LIGHT_GRAY_COLOR,
            color: LIGHT_GRAY_COLOR
          }}
        />
        <Bar
          data={barData}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Activity count / Distance',
                color: LIGHT_GRAY_COLOR,
                font: { size: 18 }
              }
            },
            scales: {
              y: {
                ticks: {
                  // @ts-ignore
                  beginAtZero: true,
                  callback: function (value) {
                    // @ts-ignore
                    if (value % 1 === 0) {
                      return value
                    }
                  },
                  color: LIGHT_GRAY_COLOR
                },
                grid: { color: LIGHT_GRAY_COLOR }
              },
              x: {
                ticks: { color: LIGHT_GRAY_COLOR }
              }
            },
            borderColor: LIGHT_GRAY_COLOR,
            color: LIGHT_GRAY_COLOR
          }}
        />
      </VStack>
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
    </VStack>
  )
}
