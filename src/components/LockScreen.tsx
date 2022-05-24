import React, { useEffect, useState } from 'react'
import {
  Center,
  Fade,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  Text,
  VStack
} from '@chakra-ui/react'
import { useDoubleTap } from 'use-double-tap'
import { BsLightningFill } from 'react-icons/all'
import { useLightningDataStorage } from '../storage'

export const LockScreen = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isDetected, setIsDetected] = useState(false)
  const { data } = useLightningDataStorage()
  useEffect(() => {
    if (isOpen) {
      setIsDetected(true)
    }
  }, [data])
  const handleClose = async () => {
    //if (document.fullscreenElement) {
    //  await document.exitFullscreen()
    //}
    setIsDetected(false)
    onClose()
  }
  const bind = useDoubleTap(async () => {
    await handleClose()
  })
  console.log({ isDetected, isOpen })
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalContent>
        <ModalBody p={0} bg="black" {...bind}>
          <Center as="button" width="100%" minHeight="100vh">
            <Fade in={isDetected} transition={{ enter: { duration: 0.5 } }}>
              <VStack spacing={4}>
                <IconButton
                  aria-label="checkLightning"
                  onClick={handleClose}
                  icon={<BsLightningFill size={50} />}
                  bg="none"
                  _active={{ bg: 'none' }}
                  _hover={{ bg: 'none' }}
                />
                <Text>New activity was detected.</Text>
              </VStack>
            </Fade>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
