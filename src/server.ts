import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
	console.log('Received request for /api/message with headers:', req.headers);
	res.json({ message: "Hello from TypeScript Node.js" });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});