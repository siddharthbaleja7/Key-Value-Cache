const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Initialize Redis client
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const CACHE_TTL = process.env.CACHE_TTL || 3600; // Default cache expiry: 1 hour

const client = redis.createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
});

client.connect().catch(err => console.error('Redis connection error:', err));

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// PUT endpoint
app.post('/put', async (req, res) => {
    const { key, value } = req.body;

    if (!key || !value || key.length > 256 || value.length > 256) {
        return res.status(400).json({ status: 'ERROR', message: 'Key or value exceeds 256 characters.' });
    }

    try {
        await client.set(key, value);
        await client.expire(key, CACHE_TTL);  // Set the expiration time separately
        res.json({ status: 'OK', message: 'Key inserted/updated successfully.' });
    } catch (err) {
        return res.status(500).json({ status: 'ERROR', message: 'Error inserting/updating key.' });
    }
});

// GET endpoint
app.get('/get', async (req, res) => {
    const { key } = req.query;

    if (!key) {
        return res.status(400).json({ status: 'ERROR', message: 'Key is required.' });
    }

    try {
        const value = await client.get(key);
        if (value === null) {
            return res.status(404).json({ status: 'ERROR', message: 'Key not found.' });
        }
        res.json({ status: 'OK', key, value });
    } catch (err) {
        return res.status(500).json({ status: 'ERROR', message: 'Error retrieving key.' });
    }
});

// Start server
const PORT = 7171;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
