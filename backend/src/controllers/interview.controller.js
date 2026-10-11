const pdfParse = require("pdf-parse");
const {generateInterviewReport} = require("../services/ai.service");
  const interviewReportModel = require("../models/interviewReport.model");

console.log("Imported service:", typeof generateInterviewReport);

async function generateInterviewReportController(req, res) {
  // const resumeFile = req.file;

  const resumeContent = await new pdfParse.PDFParse({ data: new Uint8Array(req.file.buffer) }).getText();
  
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });
  res.status(201).json({
    message: "Interview report genetared successfully",
    interviewReport,
  });
}

module.exports = { generateInterviewReportController };
