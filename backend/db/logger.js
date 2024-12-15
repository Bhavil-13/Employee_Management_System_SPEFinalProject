const winston = require('winston');
const path = require('path');

// Define log file paths (these will be mounted to Docker or stored locally)
const logDir = path.join(__dirname, '../var/log/myapp');

// Create log directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create the Winston logger
const logger = winston.createLogger({
  level: 'info', // Adjust the logging level as needed (e.g., 'debug', 'warn', 'error')
  transports: [
    // Log to a file
    new winston.transports.File({ filename: `${logDir}/combined.log` }),
    new winston.transports.File({ filename: `${logDir}/error.log`, level: 'error' }),
    // Log to the console (optional)
    // new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
  ]
});

module.exports = logger;
