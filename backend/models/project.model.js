import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    users:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
});

const Project = mongoose.model('project', projectSchema);

export default Project;