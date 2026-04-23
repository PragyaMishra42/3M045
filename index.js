// ======================================================
// IMPORT REQUIRED PACKAGES
// ======================================================

// Express is used to create server and routes
const express = require("express");

// Mongoose is used to connect Node.js with MongoDB
const mongoose = require("mongoose");

// Import Student model
const Student = require("./models/Student");

// Load .env variables
require("dotenv").config();



// ======================================================
// CREATE EXPRESS APP
// ======================================================

const app = express();

// Middleware to accept JSON data from Postman / frontend
app.use(express.json());

// Read PORT from .env file
const PORT = process.env.PORT;



// ======================================================
// CONNECT TO MONGODB DATABASE
// ======================================================

mongoose.connect(process.env.MONGO_URL)

.then(() => {
    console.log("MongoDB connected");
})

.catch((err) => {
    console.log(err);
});



// ======================================================
// CREATE STUDENT RECORD
// POST /students
// ======================================================

app.post("/students", async (req, res) => {
    try {
        // Create new student using request body data
        const student = await Student.create(req.body);

        // Send success response
        res.status(201).json(student);

    } catch (err) {
        // Error if validation fails
        res.status(400).json({
            message: err.message
        });
    }
});



// ======================================================
// GET SINGLE STUDENT BY ID
// GET /students/:id
// ======================================================

app.get("/students/:id", async (req, res) => {
    try {
        // Find student using MongoDB ID
        const student = await Student.findById(req.params.id);

        // Send student data
        res.json(student);

    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
});



// ======================================================
// DELETE STUDENT BY ID
// DELETE /students/:id
// ======================================================

app.delete("/students/:id", async (req, res) => {
    try {
        // Find student by ID and delete
        const student = await Student.findByIdAndDelete(req.params.id);

        // Send deleted student data
        res.json(student);

    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
});



// ======================================================
// UPDATE STUDENT BY ID
// PUT /students/:id
// ======================================================

app.put("/students/:id", async (req, res) => {
    try {
        // Find student by ID and update data
        const student = await Student.findByIdAndUpdate(
            req.params.id,   // ID from URL
            req.body,        // New data from body
            {
                new: true,           // return updated data 
                runValidators: true // apply schema validation
//                 {
//    returnDocument: "after",
//    runValidators: true
// }
            }
        );

        // Send updated student data
        res.json(student);

    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
});



// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});



// mongodb+srv://mishrapragya9162_db_user:123@cluster0.ljjwuaw.mongodb.net/?appName=Cluster0