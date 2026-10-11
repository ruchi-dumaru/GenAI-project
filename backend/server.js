const app=require("./src/app");
const connectDB=require("./src/config/db")
// const invokeGeminiAi = require("./src/services/ai.service")
require("dotenv").config();
const {resume,selfDescription,jobDescription}= require("./src/services/temp")
const {generateInterviewReport,generateResumePdf}=require("./src/services/ai.service")

connectDB()

generateInterviewReport({resume,selfDescription,jobDescription})
// invokeGeminiAi().catch((error) => {
//   console.error("Failed to invoke Gemini:", error.message);
// });

app.listen(4000,()=>{
  console.log("server is running on port 4000")
})