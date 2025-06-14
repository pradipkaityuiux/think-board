import dotenv from "dotenv";
import express from "express";
import notesRoute from "./routes/notes.route.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

// Get the directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(rateLimiter);
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}

app.use("/api/notes", notesRoute);

if (process.env.NODE_ENV==='production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res)=> {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB().then(()=> {
    app.listen(5001, ()=>{
        console.log("Server is running on port 5001");
    })
});

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})
