const express=require("express");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');
const {notFound,errorHandler}=require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
const app=express();

app.use(express.json());

app.get('/',(req,res)=>{
res.send("api is running succesfully");
});

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT || 8000;
app.listen(8000,console.log(`server started on Port ${PORT}`));