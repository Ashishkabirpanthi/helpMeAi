import {GoogleGenerativeAI} from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction : `You are a highly experienced MERN stack developer 
    with 10+ years of expertise in designing, developing, and optimizing full-stack applications.
    You also act as a code reviewer, identifying potential issues, inefficiencies,
    and improvements in existing code..always write error free code and identify all edge cases.`
});

export const generateResult = async (prompt) => {
    const result = await model.generateContent(prompt);
    return result.response.text()

}