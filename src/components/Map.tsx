import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Circle, MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Box, Center, HStack, IconButton, Text } from '@chakra-ui/react'
import { LightningData } from '../storage'
import groupBy from 'lodash.groupby'
import { format } from 'date-fns'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/all'
import {
  BG_COLOR,
  LAT_LONG_KM,
  LIGHT_GRAY_COLOR,
  MAP_OFFSET,
  NAVBAR_COLOR,
  UserLocation
} from '../constants'

const getAvgLat = (values: LightningData[]) =>
  values.reduce((prev, curr) => prev + curr.position[0], 0) / values.length

const getAvgLong = (values: LightningData[]) =>
  values.reduce((prev, curr) => prev + curr.position[1], 0) / values.length

const getSouthWest = (values: LightningData[]): UserLocation =>
  values.reduce((prev, curr) => {
    const currDistanceInLatLong = curr.distance * LAT_LONG_KM + MAP_OFFSET
    const currLat = curr.position[0] - currDistanceInLatLong
    const currLong = curr.position[1] - currDistanceInLatLong
    const [prevLat, prevLong] = prev
    return [prevLat < currLat ? prevLat : currLat, prevLong < currLong ? prevLong : currLong]
  }, values[0].position)

const getNorthEast = (values: LightningData[]): UserLocation =>
  values.reduce((prev, curr) => {
    const currDistanceInLatLong = curr.distance * LAT_LONG_KM + MAP_OFFSET
    const currLat = curr.position[0] + currDistanceInLatLong
    const currLong = curr.position[1] + currDistanceInLatLong
    const [prevLat, prevLong] = prev
    return [prevLat > currLat ? prevLat : currLat, prevLong > currLong ? prevLong : currLong]
  }, values[0].position)

const CenterSetter = ({
  day,
  positions,
  maxBounds
}: {
  day: number
  positions: number[][]
  maxBounds: number[][][]
}) => {
  const map = useMap()

  useEffect(() => {
    map.setView(positions[day])
    map.setMinZoom(map.getZoom() - 2)
    map.fitBounds(maxBounds[day])
    map.setMinZoom(map.getBoundsZoom(maxBounds[day]))
    map.setMaxBounds(maxBounds[day])
  }, [day])

  return <Fragment />
}

export const Map = ({ data }: { data: LightningData[] }) => {
  if (!data.length) {
    return (
      <Center h="calc(100vh - 120px)">
        <Text>Unable to show map without data</Text>
      </Center>
    )
  }
  const dataByDay = groupBy(data, (activity) => format(new Date(activity.time), 'd. M. yyyy'))
  const days = Object.keys(dataByDay)
  const [day, setDay] = useState(days.length - 1)

  const dayData = dataByDay[days[day]]

  const positions = useMemo(
    () =>
      Object.values(dataByDay).map((dataByDayItem) => {
        const avgLat = getAvgLat(dataByDayItem)
        const avgLong = getAvgLong(dataByDayItem)
        return [avgLat, avgLong]
      }),
    []
  )

  const maxBounds = useMemo(
    () =>
      Object.values(dataByDay).map((dataByDayItem) => {
        const southWest = getSouthWest(dataByDayItem)
        const northEast = getNorthEast(dataByDayItem)
        return [southWest, northEast]
      }),
    []
  )

  return (
    <>
      <Box id="map-id">
        <MapContainer
          // @ts-ignore
          center={positions[day]}
          zoom={8}
          maxZoom={13}
          minZoom={5}
          style={{ height: 'calc(100vh - 120px)', width: '100wh', background: BG_COLOR }}
          id="map"
        >
          <TileLayer
            // @ts-ignore
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
          {dayData.map(({ distance, position, time }) => {
            const timeDate = time instanceof Date ? time : new Date(time)
            return (
              <Circle
                key={timeDate.getTime()}
                center={position}
                // @ts-ignore
                radius={distance * 1000}
                color={LIGHT_GRAY_COLOR}
                fillColor="transparent"
              />
            )
          })}
          <CenterSetter day={day} positions={positions} maxBounds={maxBounds} />
        </MapContainer>
      </Box>
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
    </>
  )
}
