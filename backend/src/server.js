import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== 'production') {
    // middleware
    app.use(cors(
        { origin: "http://localhost:5173" } // allow requests from frontend server
    ));
}

app.use(express.json()); // this middleware is used to parse JSON bodies, req.body, req.title, req.content, etc.
app.use(rateLimiter);

// app.use((req, res, next) => {
//     console.log("Request Method:", req.method, "Request URL:", req.url);
//     next();
// });

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

connectDB().then( () => {
    app.listen(PORT, () => {
        console.log('Server is running on PORT:', PORT);
    });
});