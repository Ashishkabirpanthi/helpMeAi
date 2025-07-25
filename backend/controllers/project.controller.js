import *as projectService from '../services/project.service.js'
import userModel from '../models/user.model.js';
import {validationResult} from 'express-validator';
import chatModel from '../models/chat.model.js';

export const createProject = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
   
    try { 
        const {name} = req.body;
        const loggedInUser = await userModel.findOne({
            email:req.user.email
        });
        const userId = loggedInUser._id;
        console.log(userId)
        const newProject = await projectService.createProject(name, userId);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getAllProject = async(req,res) => {
    try {
        const loggedInUser = await userModel.findOne({
            email:req.user.email
        })
        const allProject = await projectService.getAllProjectbyUserId(loggedInUser._id)

    res.status(200).json({
        projects:allProject
    })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            error:err.message
        })
    }
}

export const addUserToProject = async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {projectId,users} = req.body;

        const loggedInUser = await userModel.findOne({
            email:req.user.email
        })

        const project = await projectService.addUserToProject(
            projectId,
            users,
            loggedInUser._id
        )
        
        res.status(200).json({
            project
        })
    } catch (error) {
        res.status(400).json({
            err:error.message
        })
    }
}

export const getProjectById = async(req,res) =>{
    const { projectId } = req.params;
    try {
        const project = await projectService.getProjectById({projectId});
        return res.status(200).json({
            project
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            err:error.message
        })
    }
}

export const saveMessage = async (req, res) => {
  const { projectId, sender, message } = req.body;
  console.log(sender,message);
  try {
    const newMessage = new chatModel({ projectId, sender, message });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to save message" });
  }
};

export const getProjectChats = async (req, res) => {
    const { projectId } = req.params;
    try {
      const chats = await chatModel.find({ projectId }).populate("sender","email").sort({timestamp:1});
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve messages"});
    }
  };
  