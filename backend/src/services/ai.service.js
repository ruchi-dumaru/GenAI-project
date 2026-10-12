

const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


// //     const prompt = `Generate an interview report for a candidate with the following details:
// //                         Resume: ${resume}
// //                         Self Description: ${selfDescription}
// //                         Job Description: ${jobDescription}
// // `


// const prompt = `
// You are an AI interview preparation assistant.

// Analyze the candidate's resume, self-description, and job description.

// Generate an interview report using EXACTLY the JSON structure defined below.

// OUTPUT RULES:
// 1. Return valid JSON only. Do not include Markdown, explanations, or code fences.
// 2. Do not create separate arrays for questions, intentions, and answers.
// 3. Each technical question MUST be an object containing:
//    question, intention, answer.
// 4. Each behavioral question MUST be an object containing:
//    question, intention, answer.
// 5. Each skill gap MUST be an object containing:
//    skill, severity.
// 6. Severity MUST be exactly one of: "low", "medium", "high".
// 7. matchScore MUST be a number between 0 and 100, not a string.
// 8. Each preparation plan item MUST contain:
//    day (number), focus (string), tasks (array of strings).
// 9. Use exactly these property names. Do not rename or omit fields.
// 10. Generate 5 technical questions, 3 behavioral questions,
//     3-5 skill gaps, and a 7-day preparation plan.
// 11. Base the analysis on the provided candidate information.
//     Do not invent experience or claim that the candidate has
//     skills that are not supported by the information.
// 12. Answers should be helpful sample answers that the candidate
//     can adapt to their actual experience.

// REQUIRED JSON STRUCTURE:
// {
//   "matchScore": 85,
//   "technicalQuestions": [
//     {
//       "question": "Example technical question",
//       "intention": "What this question evaluates",
//       "answer": "A suitable sample answer"
//     }
//   ],
//   "behavioralQuestions": [
//     {
//       "question": "Example behavioral question",
//       "intention": "What this question evaluates",
//       "answer": "A suitable sample answer"
//     }
//   ],
//   "skillGaps": [
//     {
//       "skill": "Example missing skill",
//       "severity": "medium"
//     }
//   ],
//   "preparationPlan": [
//     {
//       "day": 1,
//       "focus": "Topic to study",
//       "tasks": [
//         "First practical task",
//         "Second practical task"
//       ]
//     }
//   ]
// }

// CANDIDATE RESUME:
// ${resume}

// CANDIDATE SELF-DESCRIPTION:
// ${selfDescription}

// JOB DESCRIPTION:
// ${jobDescription}

// Generate the complete interview report now.
// `;


//     const response = await ai.models.generateContent({
//         model: "gemini-3.5-flash-lite",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//         }
//     })

//     // return JSON.parse(response.text)
//    const report = JSON.parse(response.text);
// console.log(JSON.stringify(report, null, 2));
// }



async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {
    const prompt = `
You are an AI interview preparation assistant.

Analyze the candidate's information and generate a personalized interview report.

Rules:
- Generate exactly 5 technical questions.
- Generate exactly 3 behavioral questions.
- Generate 3 to 5 skill gaps.
- Generate a 7-day preparation plan.
- Every technical question must contain question, intention, and answer.
- Every behavioral question must contain question, intention, and answer.
- Every skill gap must contain skill and severity.
- Severity must be low, medium, or high.
- Every preparation plan item must contain day, focus, and tasks.
- Include the title field with the job title.
- Set matchScore to a number between 0 and 100.
- Do not invent qualifications or experience.
- Return data matching the supplied JSON schema.

Candidate resume:
${resume || "Not provided"}

Candidate self-description:
${selfDescription || "Not provided"}

Job description:
${jobDescription}
`;

    
const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: "OBJECT",
            properties: {
                title: {
                    type: "STRING"
                },
                matchScore: {
                    type: "NUMBER"
                },
                technicalQuestions: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            question: { type: "STRING" },
                            intention: { type: "STRING" },
                            answer: { type: "STRING" }
                        },
                        required: [
                            "question",
                            "intention",
                            "answer"
                        ]
                    }
                },
                behavioralQuestions: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            question: { type: "STRING" },
                            intention: { type: "STRING" },
                            answer: { type: "STRING" }
                        },
                        required: [
                            "question",
                            "intention",
                            "answer"
                        ]
                    }
                },
                skillGaps: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            skill: { type: "STRING" },
                            severity: {
                                type: "STRING",
                                enum: ["low", "medium", "high"]
                            }
                        },
                        required: ["skill", "severity"]
                    }
                },
                preparationPlan: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            day: { type: "INTEGER" },
                            focus: { type: "STRING" },
                            tasks: {
                                type: "ARRAY",
                                items: { type: "STRING" }
                            }
                        },
                        required: ["day", "focus", "tasks"]
                    }
                }
            },
            required: [
                "title",
                "matchScore",
                "technicalQuestions",
                "behavioralQuestions",
                "skillGaps",
                "preparationPlan"
            ]
        }
    }
});

console.log("Gemini raw response:", response.text);

const parsedReport = JSON.parse(response.text);
// const report = interviewReportSchema.parse(parsedReport);
// 
// return JSON.stringify(report, null, 2);


const report = interviewReportSchema.parse(parsedReport);
return report;

}


async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }