const jwt=require("jsonwebtoken");

const  generateToken=()=>{
  return jwt.sign({id},process.env.JTW_SECRET,{
    expiresIn:"30d"
  })
}

module.exports= generateToken;