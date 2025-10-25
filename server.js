// Simple Express server for site + email API (same-origin, no CORS needed)
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files: serve project root and public assets
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Wire to serverless handler for local dev
const sendEmailHandler = require('./api/send-email.js');
app.post('/api/send-email', (req, res) => sendEmailHandler(req, res));
app.get('/api/send-email', (req, res) => res.status(200).json({ ok: true }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[WEB] Listening on http://localhost:${PORT}`);
});
