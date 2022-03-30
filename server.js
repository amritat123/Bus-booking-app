const express = require('express');
const connectDB = require('./config/db');

// const app = require('path');
const app=express();

app.get('/', (req,res) => res.send('API Runing'));

// Connect Database
connectDB();

//Init Middleware
// app.use(express.json({ extended: false })); 
// // it allows us to get data from user.js (req.body)
// // Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/Booking', require('./routes/api/Booking'));
app.use('/api/bus', require('./routes/api/bus'));
app.use('/api/owner', require('./routes/api/owner'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
