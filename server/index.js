import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import MessageRoutes from "./routes/message.js";
import { register  } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import { Server } from "socket.io";
import http from "http";

/* CONFIGURATION */ 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
app.use("/assets",express.static(path.join(__dirname, 'public/assets')));
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin : "*",
        methods: ["GET", "POST", "PATCH"]
    }
});
io.listen(8000);

/* SOCKET */

io.on("connection", (socket) => {
    console.log("Connected to " + socket.id);
    socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`User with the id ${socket.id} joined the room ${roomId}`);
    })
    socket.on("recieve_message", (message) => {
        socket.to(message.roomId).emit("send_message", message);
    })
    socket.on("disconnect", () => {
        console.log("User disconnected ", socket.id);
    })
})


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage});

/* ROUTE WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth" , authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/message", MessageRoutes);

/* MONGOOSE */
const PORT = process.env.PORT || 6001;
mongoose.connect("mongodb://127.0.0.1:27017/socialmedia").then(() => {
    app.listen(PORT, () => console.log("Server running on " + PORT));
    
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => console.log(error + " did not connect"));