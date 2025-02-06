import momgoose from "momgoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        minLength: [6,'email must be atleast 6 characters long'],
        maxLength:[50,'email must be less than 50 characters']
    },
    password:{
        type:String,
        required: true
    }
});