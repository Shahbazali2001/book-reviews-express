import express from "express";
import cors from "cors";
// import session from "express-session";
// import dotenv from "dotenv";
// import { v4 as uuidv4 } from "uuid";
// import { fileURLToPath } from "url";
// import path from "path";

import bookRoutes from "./routes/books.js";           // 
import reviewRoutes from "./routes/reviews.js";

import userRoutes from "./routes/users.js";
// import authRoutes from "./routes/auth.js";

const app= express();

app.use(cors());
app.use(express.json());


app.use('/books', bookRoutes);
app.use('/books', reviewRoutes);

app.use('/users', userRoutes);
// app.use('/auth', authRoutes);


app.get("/", (req, res) => {
  res.send('📚 Online Book Review API is running!');
});


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});



























const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port : ", PORT);
});