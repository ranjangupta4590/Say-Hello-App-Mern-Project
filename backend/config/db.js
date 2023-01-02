const mongoose=require('mongoose');

const url='mongodb://127.0.0.1:27017/userChat';

const connectDB= async()=>{
     try{
       const conn=await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
       console.log(`connection successful : ${conn.connection.host}`)
     }
     catch(error){
       console.log(`Error :${error.message}`);
       process.exit();
     }
}

module.exports =connectDB;