import express from 'express';
import path from 'path';

const app = express();

app.use('/scoreboard', express.static('dist'));

app.use('/scoreboard/*', (req, res)  => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

export default app;
