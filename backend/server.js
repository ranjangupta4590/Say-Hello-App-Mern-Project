const express=require("express");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');
const messageRoutes = require("./routes/messageRoutes");
const {notFound,errorHandler}=require("./middleware/errorMiddleware");

dotenv.config().parsed;
const app=express();
connectDB();

app.use(express.json());

// app.get('/',(req,res)=>{
// res.send("api is running succesfully");
// });

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT || 8000;
app.listen(8000,console.log(`server started on Port ${PORT}`));
