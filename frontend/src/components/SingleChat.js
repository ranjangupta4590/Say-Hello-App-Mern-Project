import React from 'react';
import { Box,Text } from '@chakra-ui/layout';
import { ChatState } from '../Context/ChatProvider';
import {BiArrowBack} from 'react-icons/bi';
import { IconButton } from '@chakra-ui/react';
import ProfileModel from './mislenicious/ProfileModel';
import { getSender, getSenderFull } from '../Config/ChatLogics';
import UpdateGroupChat from './mislenicious/UpdateGroupChat';
const SingleChat = ({fetchMessages,fetchAgain, setFetchAgain}) => {
 const {user,selectedChat,setSelectedChat}=ChatState();

  return (
    <>
      {selectedChat ? (
      <>
      <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<BiArrowBack />}
              onClick={() => setSelectedChat("")}
            />
             {
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModel
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChat
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}  
      </Text>
      <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          ></Box>
      </>
      ) : (
        // to get socket.io on same page
        <Box className='flex items-center justify-center h-[100%] '>
          <Text fontSize="3xl" pb={3} fontFamily="Work sans" className='opacity-2'>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  )
}

export default SingleChat;