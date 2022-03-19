const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

const authRouter = require('./routes/authRoute');
const sharkRouter = require('./routes/sharkRoute');
const trainingRouter = require('./routes/trainingRoute');
const pvpRoute = require('./routes/pvpRoute');

app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/shark', sharkRouter);
app.use('/api/v1/training', trainingRouter);
app.use('/api/v1/pvp', pvpRoute)


module.exports = app;