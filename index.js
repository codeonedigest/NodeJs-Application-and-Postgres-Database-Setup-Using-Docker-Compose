const express = require('express');
const { connect } = require('http2');
const {Pool} = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

const poolc = new Pool({ connectionString: process.env.DATABASE_URL });

// Middleware to parse JSON
app.use(express.json());

// GET API endpoint that returns a string
app.get('/api/now', async (req, res) => {
    const { rows } = await poolc.query('SELECT NOW() as now');
    res.json({
        message: "Hello from Node.js API!",
        dbTime: rows[0].now,
        timestamp: new Date().toISOString(),
        status: "success"
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Node.js API Server is running!');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to see the server`);
    console.log(`API endpoint: http://localhost:${PORT}/api/message`);
});