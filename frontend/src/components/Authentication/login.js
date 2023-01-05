import React from 'react'
import { useState } from 'react';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import {useHistory} from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  

  const toggle =()=>{
     setOpen(!open)
  }
  
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  
  
  return (
    <div className=''>
      <div className="">
        <form>
          <div className="mb-6 w-[100%]">
            <input
            id='email'
            required
            value={email}
              type="email"
              className=" block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              onChange={(e)=>setEmail(e.target.value)}
              />
          </div>

          <div className="mb-6  relative" >
          <div >
            <input
            id='password'
              required
              value={password}
              type={(!open?'password':'text')}
              className=" block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className='text-2xl absolute top-3 right-5'>
            {
              (!open?<AiFillEyeInvisible  onClick={toggle}/>:<AiFillEye onClick={toggle}/>)
            } 
          </div>
          </div>

          {/* <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck3"
                checked
              />
              <label className="form-check-label inline-block text-gray-800" for="exampleCheck2"
              >Remember me
              </label>
            </div>
            <a
              href="#!"
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
            >Forgot password?</a
            >
          </div> */}
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={submitHandler}
            disabled={loading}
          >
            Login
          </button>
          <button
            type="submit"
            className="inline-block px-7 py-3 mt-2 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={()=>{
               setEmail("guestemail@gmail.com")
               setPassword("46542146")
            }}
            
          >
            Guest User Credential
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;