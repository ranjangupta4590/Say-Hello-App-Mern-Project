import React from 'react'
import { Button, IconButton, Image, Text, useDisclosure } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { AiFillEye } from 'react-icons/ai';

const ProfileModel = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <div>
            {
                children ? (<span onClick={onOpen}>{children}</span>) : (
                    <IconButton className='flex ' icon={AiFillEye} onClick={onOpen} />
                )
            }

            <Modal  blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className='bg-pink-300'>
                    <ModalHeader className='text-3xl flex justify-center text-black 'fontFamily="Work sans">{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='flex flex-col items-center justify-between'>
                      <Image boxSize="150px"className='rounded-full ' src={user.pic} alt={user.name}/>
                      <Text fontFamily='Work sans' fontSize={{base:"28px",md:"30px"}}>
                        Email: {user.email}
                      </Text>
                    </ModalBody>

                    <ModalFooter>
                       <Button onClick={onClose} className='mr-3 bg-blue-600'>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ProfileModel;