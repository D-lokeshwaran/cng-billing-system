/* ---------------------------------------------
    SUPPORT API SERVER
----------------------------------------------- */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');

const { logEvents, logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3600;
dotenv.config();
connectDB();
const app = express();

// middlewares
app.use(logger);
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.json()); // build in middleware
app.use(cookieParser()); // to parse jwt token in cookie
app.use(cors(corsOptions));


// routers
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/profile', require('./routes/profile'));

// Error handler
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})


