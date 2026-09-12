require("dotenv").config()

const mongoose=require("mongoose");

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGODB_URL)
  console.log("DB connected")
  }catch(err){
    console.log(err)
  }
}

module.exports=connectDB