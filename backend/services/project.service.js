import projectModel from "../models/project.model.js";
import mongoose from 'mongoose'

export const createProject = async(
    name,
    userId
) => {
    if(!name){
        throw new Error('name is required')
    }
    if(!userId){
        throw new Error('userId is required')
    }
    const existingProject = await projectModel.findOne({ name });
    if (existingProject) {
        throw new Error('Project already exists.Create unique project');
    }
    
    const project = await projectModel.create({
        name,
        users:[userId]
    })
    return project;
}

export const getAllProjectbyUserId = async(
    userId
) => {
    if(!userId){
        throw new Error('UserId is must require');
    }

    const allProject = await projectModel.find({
        users:userId
    });
    return allProject;
}

export const addUserToProject = async(
    projectId,users,userId
) => {
    if(!projectId){
        throw new Error('ProjectId is required');
    }
    if(!users){
        throw new Error('Users must be required');
    }
    if(!userId){
        throw new Error('UserId must be required');

    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid project');
    }
    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error('Invalid userId in users array');
    }
    const projects = await projectModel.find({
        _id:projectId,
        users:userId
    })
    if(!projects){
        throw new Error('User Doest blongs to this project');
    }
    const updatedProject = await projectModel.findOneAndUpdate({
        _id:projectId
    },{
        $addToSet:{
            users:{
                $each: users
            }
        }
    },{
        new: true
    })

    return updatedProject
}