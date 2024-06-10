const { v4: uuid } = require('uuid');
const { format } = require('date-fns');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const EventEmitter = require('events'); //common core module events (default


const logEvents = async (message, logName) => {
    try {
        const eventDate = format(new Date(), 'dd/MM/yy HH:mm:ss');
        const logItem = `${uuid()}\t${eventDate}\t${message}\n`
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(
            path.join(__dirname, '..', 'logs', logName),
            logItem
        )
    } catch (error) {
        console.log(error)
    }
}

const logger = (req, res, next) => {
    const logItem = `${req.method}\t${req.headers.origin}\t${req.url}`
    console.log(`${req.method}\t${req.url}`);
    logEvents(logItem, 'reqLog.txt');
    next();
}

module.exports = { logEvents, logger };