const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Book");
require("dotenv").config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log(err);
});

app.post("/books", async (req, res) => {
    try {
        const book = await Book.create(req.body);

        res.status(201).json(book);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

app.get("/books", async (req, res) => {
    try {

        let filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.price) {
            filter.price = { $lte: Number(req.query.price) };
        }

        const books = await Book.find(filter);

        res.json(books);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

app.get("/books/:id", async (req, res) => {
    try {

        const book = await Book.findById(req.params.id);

        res.json(book);

    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
});
app.get("/", (req,res)=>{
   res.send("Book API Running 🚀");
});

app.delete("/books/:id", async (req, res) => {
    try {

        const book = await Book.findByIdAndDelete(req.params.id);

        res.json(book);

    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
});

app.put("/books/:id", async (req, res) => {
    try {

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        res.json(book);

    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});