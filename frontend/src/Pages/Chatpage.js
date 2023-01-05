import React from 'react';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/mislenicious/SideDrawer';
import MyChats from '../components/mislenicious/MyChats';
import ChatBox from '../components/mislenicious/ChatBox';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';

const Chatpage = () => {
 const {user}=ChatState();
 const [fetchAgain, setFetchAgain] = useState(false)
 

  return (
  
    <div className='w-[100%]'>
         {user && <SideDrawer/>}
      <div className='flex justify-between w-[100%] h-[91.5vh] p-5'>
         {user && <MyChats fetchAgain={fetchAgain} />}
         {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </div>
    </div>
  )
}

export default withRouter( Chatpage);