const allowedOrigins = require('./allowedOrigins');

// CORS -> Cross Origin Request Sharing
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionSuccessStatus: 200,
    credentials: true
}

module.exports = corsOptions;