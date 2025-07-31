const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// --- CORRECT CORS CONFIGURATION ---
// This configuration explicitly allows your frontend (running on port 3001 locally)
// and your deployed Vercel frontend URLs to send requests with credentials (cookies).
const allowedOrigins = [
  'http://localhost:3001', // For local development
  'https://quill-connect-git-main-omkar4965s-projects.vercel.app', // Your deployed frontend URL
  'https://quill-connect-m2dr.vercel.app' // Your deployed backend URL (if it also makes requests to itself or is the primary domain)
  // Add any other production domains for your frontend here if they exist
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // or if the origin is in our allowed list.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Important for sending cookies/authentication headers
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
  optionsSuccessStatus: 204 // For preflight requests, respond with 204 No Content
};

// --- MIDDLEWARE SETUP ---
// It's important to set up CORS before your routes.
app.use(cors(corsOptions));

// Other middleware
app.use(bodyParser.json());
app.use(cookieParser());

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
