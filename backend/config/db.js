const mongoose=require('mongoose');
// const dotenv=require("dotenv");
// dotenv.config();
// const url =process.env.MONGO_URI
const url='mongodb://127.0.0.1:27017/userChat';
const connectDB= async()=>{
     try{
       mongoose.set('strictQuery', true);
      const conn = await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        // useCreateIndex: true
      });
      console.log(`connection successful : ${conn.connection.host}`)
     }
     catch(error){
       console.log(`Error :${error.message}`);
       process.exit();
     }
}

module.exports =connectDB;