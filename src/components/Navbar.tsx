import React from 'react'
import {
  Box,
  Button,
  HStack,
  Link,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  ButtonProps,
  IconButton,
  Center
} from '@chakra-ui/react'
import { PAGE } from '../constants'
import { usePageStorage } from '../storage'
import { BiMenu, BiX } from 'react-icons/all'

interface NavLinkProps extends ButtonProps {
  text: string
}

const NavLink = ({ text, ...rest }: NavLinkProps) => (
  // @ts-ignore
  <Text as="button" fontSize="xl" textTransform="capitalize" {...rest}>
    {text}
  </Text>
)

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { page, updatePage } = usePageStorage()
  return (
    <>
      <HStack w="full" h="60px" bg="white" pos="fixed" px={4}>
        <IconButton aria-label={'openModal'} onClick={onOpen} icon={<BiMenu size="lg" />} />
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalContent>
          <ModalBody p={0}>
            <HStack flexFlow="row-reverse" h="60px" alignItems="center" px={4}>
              <IconButton aria-label={'closeModal'} onClick={onClose} icon={<BiX size="lg" />} />
            </HStack>
            <VStack spacing={8} justifyContent="space-between" pt={24}>
              {Object.values(PAGE).map((pageTitle) => (
                <NavLink
                  key={pageTitle}
                  text={pageTitle}
                  color={pageTitle === page ? 'black' : 'gray'}
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
    </>
  )
}
