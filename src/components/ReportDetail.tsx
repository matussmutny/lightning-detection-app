import React, { Fragment, useEffect, useState } from 'react'
import {
  Box,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  UseDisclosureProps,
  VStack,
  Button
} from '@chakra-ui/react'
import { BG_COLOR, LAT_LONG_KM, LIGHT_GRAY_COLOR, NAVBAR_COLOR } from '../constants'
import { LightningData } from '../storage'
import { Circle, MapContainer, TileLayer, useMap } from 'react-leaflet'
import { format } from 'date-fns'

const CenterSetter = ({
  maxBounds,
  minBounds,
  position,
  isZoomed
}: {
  maxBounds: number[][]
  minBounds: number[][]
  position: number[]
  isZoomed: boolean | undefined
}) => {
  const map = useMap()

  map.setMinZoom(map.getBoundsZoom(maxBounds))
  map.setMaxZoom(map.getBoundsZoom(minBounds))
  map.fitBounds(maxBounds)
  map.setMaxBounds(maxBounds)

  useEffect(() => {
    if (isZoomed) {
      map.setView(position, map.getBoundsZoom(maxBounds))
    } else if (isZoomed !== undefined) {
      map.setView(position, map.getBoundsZoom(minBounds))
    }
  }, [isZoomed])

  return <Fragment />
}

export const ReportDetail = ({
  disclosure,
  reportData
}: {
  disclosure: UseDisclosureProps
  reportData: LightningData
}) => {
  const [isZoomed, setIsZoomed] = useState<boolean | undefined>(true)
  if (!reportData) {
    return <Fragment />
  }
  const { distance, position, time } = reportData
  const lat = position[0]
  const long = position[1]
  const maxOffset = 40 * LAT_LONG_KM
  const minOffset = distance * LAT_LONG_KM
  const maxBounds = [
    [lat - maxOffset, long - maxOffset],
    [lat + maxOffset, long + maxOffset]
  ]
  const minBounds = [
    [lat - minOffset, long - minOffset],
    [lat + minOffset, long + minOffset]
  ]
  const timeDate = time instanceof Date ? time : new Date(time)
  const formattedTime = format(timeDate, 'HH:MM d.M.yyyy')
  const close = () => {
    setIsZoomed(true)
    disclosure?.onClose?.()
  }
  return (
    <Modal isOpen={disclosure.isOpen!} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0} bg={NAVBAR_COLOR}>
          <VStack py={4} spacing={4}>
            <Text>Radius: {distance}km</Text>
            <Text>{formattedTime}</Text>
            <Box width="80%" height="40vh">
              <Box
                id="map-id"
                onClick={() => {
                  console.log(isZoomed)
                  if (isZoomed) {
                    setIsZoomed(false)
                  } else {
                    setIsZoomed(true)
                  }
                }}
              >
                <MapContainer
                  // @ts-ignore
                  center={position}
                  zoom={8}
                  maxZoom={30}
                  minZoom={5}
                  maxBounds={maxBounds}
                  style={{ width: '100%', height: '40vh', background: BG_COLOR }}
                  id="map"
                  zoomControl={false}
                  dragging={false}
                  doubleClickZoom={false}
                  scrollWheelZoom={false}
                  attributionControl={false}
                >
                  <CenterSetter
                    maxBounds={maxBounds}
                    minBounds={minBounds}
                    position={position}
                    isZoomed={isZoomed}
                  />
                  <TileLayer
                    // @ts-ignore
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                  />

                  <Circle
                    center={position}
                    // @ts-ignore
                    radius={distance * 1000}
                    color={LIGHT_GRAY_COLOR}
                    fillColor="transparent"
                  />
                </MapContainer>
              </Box>
            </Box>
            <Button bg={BG_COLOR} onClick={close}>
              Close
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
