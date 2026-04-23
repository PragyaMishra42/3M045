const mongoose=require("mongoose");
const librarySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,      
    },
    location:{
        type:String,    

    },
    established:{
        type:Number,
        min:1000
    }
},{
    timestamps:true         
})