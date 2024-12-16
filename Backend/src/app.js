import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    // origin: ['http://localhost:3000', 'https://your-frontend-url.com'],
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json({
    limit: '16kb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));

app.use(express.static("public"))

app.use(cookieParser());

// Ensure CORS origin is set correctly
if (!process.env.CORS_ORIGIN) {
    console.error("CORS_ORIGIN environment variable is not set.");
}

// routes import

import studentRouter from './routes/student.routes.js'
import facultyRouter from './routes/faculty.routes.js';
import adminRouter from './routes/admin.routes.js';

app.use("/api/student", studentRouter)
app.use("/api/faculty", facultyRouter)
app.use("/api/admin", adminRouter)

export default app;