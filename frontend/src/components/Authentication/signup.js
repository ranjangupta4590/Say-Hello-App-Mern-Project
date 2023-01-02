import React from 'react'
import { useState } from 'react'
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import {useHistory} from 'react-router-dom';
const SignUp = () => {

const toast = useToast();
const [name, setName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [confirmpassword, setConfirmpassword] = useState();
const [pic, setPic] = useState();
const [open, setOpen] = useState(false);
const [picLoading, setPicLoading] = useState(false);
const history = useHistory();


const toggle =()=>{
   setOpen(!open)
}

const submitHandler = async () => {
  setPicLoading(true);
  if (!name || !email || !password || !confirmpassword) {
    toast({
      title: "Please Fill all the Feilds",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
    return;
  }
  if (password !== confirmpassword) {
    toast({
      title: "Passwords Do Not Match",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }
  console.log(name, email, password, pic);
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user",
      {
        name,
        email,
        password,
        pic,
      },
      config
    );
    console.log(data);
    toast({
      title: "Registration Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setPicLoading(false);
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
    setPicLoading(false);
  }
};
const postDetails = (pics) => {
  setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
}
if(pics.type==="image/jpeg"||pics.type==="image/png"){
  const data =new FormData();
  data.append("file",pics);
  data.append("upload_preset","hello-app");
  data.append("cloud_name","dbo9twrrz");
  fetch("https://api.cloudinary.com/v1_1/dbo9twrrz/image/upload",
  {method:"post",
   body:data,
   })
  .then((res)=>res.json())
  .then((data) => {
    setPic(data.url.toString());
    console.log(data.url.toString());
    setPicLoading(false);
  })
  .catch((err) => {
    console.log(err);
    setPicLoading(false);
  });
}else {
  toast({
    title: "Please Select an Image!",
    status: "warning",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
  setPicLoading(false);
  return;
}
};

     
     

return (
    <div>
      <div className="">
        <form>
          <div className="mb-6 " id="first-name">
            <input
            required
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter Your Name"
              onChange={(e)=>setName(e.target.value)}
              name='name'
            />
          </div>
          
          <div className="mb-6 " id='email'>
            <input
            required
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              name='email'
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-6  relative" id='password'>
          <div>
            <input
            required
              type={(!open?'password':'text')}
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              name='password'
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className='text-2xl absolute top-3 right-5'>
            {
              (!open?<AiFillEyeInvisible  onClick={toggle}/>:<AiFillEye onClick={toggle}/>)
            } 
          </div>
          </div>

          
          <div className="mb-6  relative" id='password'>
          <div>
            <input
            required
              type={(!open?'password':'text')}
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Confirm Password"
              name='password'
              onChange={(e)=>setConfirmpassword(e.target.value)}
            />
          </div>
          <div className='text-2xl absolute top-3 right-5'>
            {
              (!open?<AiFillEyeInvisible  onClick={toggle}/>:<AiFillEye onClick={toggle}/>)
            } 
          </div>
          </div>
          <div className="mb-6" id='pic'>
          <h1><p>Upload Profile</p></h1>
            <input
              type="file"
              className='p-2'
              accept='image/*'
              onChange={(e)=>postDetails(e.target.files[0])}
              name='pic'
            />
          </div>

         
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={submitHandler}
            disabled={picLoading}
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  )
}

export default SignUp;