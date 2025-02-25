import *as projectService from '../services/project.service.js'
import userModel from '../models/user.model.js';
import {validationResult} from 'express-validator';

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

    res.status(201).json({
        projects:allProject
    })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            error:err.message
        })
    }
}