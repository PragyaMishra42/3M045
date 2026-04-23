const mongoose=require("mongoose");
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    regNo:{
        type:Number,
        required:true,
        min:100000000
    },
    program:{
        type:String,
        required:true
    }
},{
    timestamps:true

})
module.exports = mongoose.model("Student", studentSchema);