import *as aiService from "../services/ai.service.js";

export const getAiResult = async(req,res) => {
    const {prompt} = req.query;
    const result = await aiService.generateResult(prompt);
   res.send(result);
};