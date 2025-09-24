import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8081;

// Obsługa plików statycznych z katalogu dist
app.use(express.static(path.join(__dirname, 'dist')));

// Obsługa routingu SPA (Express v5 / path-to-regexp v8 compatible)
// Avoid path matching syntax entirely to prevent path-to-regexp v8 issues
app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});