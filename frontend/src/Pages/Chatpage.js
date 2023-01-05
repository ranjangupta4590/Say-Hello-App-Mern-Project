import React from 'react';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/mislenicious/SideDrawer';
import MyChats from '../components/mislenicious/MyChats';
import ChatBox from '../components/mislenicious/ChatBox';
import { withRouter } from 'react-router-dom';

const Chatpage = () => {
 const {user}=ChatState();
 

  return (
  
    <div className='w-[100%]'>
         {user && <SideDrawer/>}
      <div className='flex justify-between w-[100%] h-[91.5vh] p-5'>
         {user && <MyChats/>}
         {user && <ChatBox/>}
      </div>
    </div>
  )
}

export default withRouter( Chatpage);