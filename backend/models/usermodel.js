const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');

const userModel=mongoose.Schema({
  
  name:{
    type:String,
    required:true
  },
  // mobile:{
  //   type:Number,
  //   required:true,
  //   max:10,
  //   min:10,
  //   unique:true
  // },
  email:{
  type:String,
  required:true,
  unique:true,
  sparse:true,
  },

  password:{
    type:String,
    required:true
  },
  
  pic:{
    type:String,
    required:true,
    default:"./default--pic.jpg",
  },
},
  {
    timestamps:true,
  }
);

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre('save',async function(next){
  if(!this.isModified){
     next();
  }
  
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt);
})

const User=mongoose.model("User",userModel);
module.exports=User;