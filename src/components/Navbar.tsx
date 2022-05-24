import React from 'react'
import {
  ButtonProps,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { BG_COLOR, LIGHT_GRAY_COLOR, NAVBAR_COLOR, Page, PAGE, WHITE_COLOR } from '../constants'
import { BiLock, BiMenu, BiX, MdBluetoothConnected, MdBluetoothDisabled } from 'react-icons/all'
import { BluetoothReturn } from '../bluetooth'
import { LockScreen } from './LockScreen'
import { useWakeLock } from 'react-screen-wake-lock'

interface NavLinkProps extends ButtonProps {
  text: string
}

const NavLink = ({ text, ...rest }: NavLinkProps) => (
  // @ts-ignore
  <Text as="button" fontSize="3xl" textTransform="capitalize" {...rest}>
    {text}
  </Text>
)

interface NavBarProps extends Partial<BluetoothReturn> {
  page: string
  updatePage: (value: Page) => void
}

export const Navbar = ({
  isLoading,
  isConnected,
  onClick,
  reset,
  page,
  updatePage
}: NavBarProps) => {
  const { isSupported, released, request } = useWakeLock()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const lockScreen = useDisclosure()

  return (
    <>
      <HStack w="full" h="60px" bg={NAVBAR_COLOR} pos="fixed" px={4} justifyContent="space-between">
        {isLoading ? (
          <Spinner size="lg" ml={1} onClick={reset} />
        ) : (
          <IconButton
            aria-label={'openModal'}
            onClick={onClick}
            disabled={isConnected}
            icon={
              isConnected ? <MdBluetoothConnected size="lg" /> : <MdBluetoothDisabled size="lg" />
            }
            _disabled={{ color: WHITE_COLOR }}
            color={LIGHT_GRAY_COLOR}
            _active={{ bg: 'none' }}
            _hover={{ bg: 'none' }}
            bg="none"
          />
        )}
        <IconButton
          aria-label="lockScreen"
          icon={<BiLock size="lg" />}
          onClick={async () => {
            //if (!document.fullscreenElement) {
            //  await document.body.requestFullscreen()
            //}
            if (isSupported && (released || released === undefined)) {
              await request()
            }
            lockScreen.onOpen()
          }}
          color={WHITE_COLOR}
          _active={{ bg: 'none' }}
          _hover={{ bg: 'none' }}
          bg="none"
          border="1px solid red"
        />
        <IconButton
          aria-label={'openModal'}
          onClick={onOpen}
          icon={<BiMenu size="lg" />}
          _active={{ bg: 'none' }}
          _hover={{ bg: 'none' }}
          bg="none"
        />
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalContent>
          <ModalBody p={0} bg={BG_COLOR}>
            <HStack flexFlow="row-reverse" h="60px" alignItems="center" px={4}>
              <IconButton
                aria-label={'closeModal'}
                onClick={onClose}
                icon={<BiX size="lg" width="lg" />}
                _active={{ bg: 'none' }}
                _hover={{ bg: 'none' }}
                bg="none"
              />
            </HStack>
            <VStack spacing={6} justifyContent="center" h="calc(100vh - 120px)">
              {Object.values(PAGE).map((pageTitle) => (
                <NavLink
                  key={pageTitle}
                  text={pageTitle}
                  textDecoration={page === pageTitle ? 'underline' : 'none'}
                  onClick={() => {
                    updatePage(pageTitle)
                    onClose()
                  }}
                />
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <LockScreen isOpen={lockScreen.isOpen} onClose={lockScreen.onClose} />
    </>
  )
}
