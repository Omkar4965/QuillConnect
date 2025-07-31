const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// --- CORRECT CORS CONFIGURATION ---
// This configuration explicitly allows your frontend (running on port 3001)
// to send requests with credentials (cookies).
const corsOptions = {
  origin: 'http://localhost:3001', // Your React app's origin
  credentials: true,
};

// --- MIDDLEWARE SETUP ---
// It's important to set up CORS before your routes.
app.use(cors(corsOptions));

// Other middleware
app.use(bodyParser.json());
app.use(cookieParser()); // You only need to call this once.

// --- DATABASE CONNECTION ---
const { dbConnect } = require('./config/database');
dbConnect();

// --- ROUTES ---
const auth = require('./Routes/auth');
const comment = require('./Routes/comment');
const user = require('./Routes/user');
const posts = require('./Routes/posts');
const conversation = require('./Routes/conversation');
const message = require('./Routes/message');

app.use('/api/user', user);
app.use('/api/comment', comment);
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/conversation', conversation);
app.use('/api/message', message);

// --- ROOT ROUTE & SERVER START ---
app.get('/', (req, res) => {
    res.send('Server is running!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at port no ${PORT}`);
});
