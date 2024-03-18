const express = require("express");
const mongoose =require("mongoose");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const app = express();
const userRoutes=require("./routes/userRoutes")
const {notFound,errorHandler}=require("./middleware/errorMiddleware");
app.use(express.json());
dotenv.config();
app.get("/", (req, res) => res.send("API is running"));
app.get("/api/notes", (req, res) => res.json(notes));
app.use("/api/users",userRoutes)
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URI;
app.listen(PORT, console.log(`server started on port ${PORT}`));
mongoose.connect(MONGOURL).then(()=>{
    console.log('MongoDB Connected');
})
.catch((error)=>console.log(error));
