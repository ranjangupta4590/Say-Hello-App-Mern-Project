import React from 'react';
import { Box, Button, Tooltip,Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, useDisclosure } from '@chakra-ui/react';
import {
    Input,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Spinner
  } from '@chakra-ui/react'
import { useState } from 'react';
import {AiFillBell} from 'react-icons/ai';
import {RiArrowDownSLine} from 'react-icons/ri';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useHistory } from 'react-router-dom';
import ChatLoading from "./ChatLoading";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import UserListItem from './UserAvatar/UserListItem';


const SideDrawer = () => {
const { isOpen, onOpen, onClose } = useDisclosure();
const [search, setSearch] = useState("");
const  [searchResult, setSearchResult] = useState([]);
const [loading, setLoading] = useState(false);
const [loadingChat, setLoadingChat] = useState();
const {user}=ChatState();

const toast = useToast();
const history = useHistory();
const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  

  return (
  <div>
    <Box className='flex justify-between items-center bg-white w-[100%] p-[5px 10px 5px 10px]'>
     <Tooltip label='Search User' hasArrow placement='bottom-end'>
        <Button variant='ghost' onClick={onOpen}>
          <i className='fas fa-search text-black'></i>
          <Text className='hidden md:flex p-2 md:visible text-black'>
            Search User
          </Text>
        </Button>
     </Tooltip>
     <Text className='text-black text-2xl items-center justify-center' fontFamily='Work sans'>Say-Hello</Text>
     <div>
        <Menu>
          <MenuButton  className=' text-black'>
           <AiFillBell className='items-center'/>
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
        <MenuButton as={Button} rightIcon={<RiArrowDownSLine/>}  className=' text-black'>
           {/* <AiFillBell className=''/> */}
           <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}/>
          </MenuButton>
          <MenuList className='text-black'>
          <ProfileModel user={user}>
          <MenuItem className='text-black'>My Profile</MenuItem>
          </ProfileModel>
          <MenuDivider/>
          <MenuItem onClick={logoutHandler} className='text-black '>Logout</MenuItem>
          </MenuList>
        </Menu>
     </div>
    </Box>
    
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    
 </div>
  )
}

export default SideDrawer;