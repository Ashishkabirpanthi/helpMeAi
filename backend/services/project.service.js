import projectModel from "../models/project.model.js";

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