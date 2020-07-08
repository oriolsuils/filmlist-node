const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth-routes');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => { console.log("connected to db!"); }
);

app.use('/api/user', authRoutes);

app.listen(3000, () => console.log("Server up and running"));