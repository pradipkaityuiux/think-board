import dotenv from "dotenv";
import express from "express";
import notesRoute from "./routes/notes.route.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

const app = express();
dotenv.config();

app.use(express.json());
app.use(rateLimiter);
app.use(cors());

connectDB().then(()=> {
    app.listen(5001, ()=>{
        console.log("Server is running on port 5001");
    })
});

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})
app.use("/api/notes", notesRoute);
