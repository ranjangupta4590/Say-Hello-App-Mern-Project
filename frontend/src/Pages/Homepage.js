import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Login from "../components/Authentication/login";
import Signup from "../components/Authentication/signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container className='flex flex-col max-w-xl justify-center items-center h-screen-[100vh] m-auto '>
      <Box className='flex justify-center items-center p-3 bg-slate-50 w-[100%] mt-[40px] mb-[15px] rounded-xl'>
        <Text className='text-3xl font-bold' fontFamily="Work sans">
          Hello-App
        </Text>
      </Box>
      <Box className='p-4 bg-slate-50 w-[100%]  rounded-xl'>
        <Tabs variant='soft-rounded'>
          <TabList className='mb-1'>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }} className='w-[50%] border-4 mr-2'>Login</Tab>
            <Tab _selected={{ color: 'white', bg: 'green.400' }} className='w-[50%] border-4'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default withRouter(Homepage);