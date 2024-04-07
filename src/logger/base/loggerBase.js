
/**
 * Import the LoggerValidation module from "../validator/validation.".
 * This module is used to validate log levels and log messages.
 * @type {Object}
 */
import { LoggerValidation as VALIDATE_LOGGER } from "../validator/validation.js"


/**
* Enum representing the available log levels.
* @readonly
* @enum {string}
*/
const LOG_LEVELS = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
};


/**
 * Validator instance for validating file names and log levels.
 * @type {VALIDATE_LOGGER}
 */const validator = new VALIDATE_LOGGER();

/**
 * Base logger class for writing log messages to custom targets.
 * Provides methods for setting log levels, formatting messages, 
 * and storing logs for retrieval.
 * 
 * @class
 */
class LoggerBase {

    /**
     * Create a LoggerBase instance.
     *
     * @param {('DEBUG'|'INFO'|'WARN')} [level=LOG_LEVELS.INFO] - Initial log level.
     * The log level determines the severity of the log messages that will be
     * logged. The available log levels are 'DEBUG', 'INFO', and 'WARN'.
     * If no level is provided, the default log level is 'INFO'.
     */
    constructor(level = LOG_LEVELS.INFO) {

        // Validate the log level.
        validator._validateLogLevel({ level });
        this.level = level;

        // Initialize the logs array.
        /**
         * @type {Array<Object>}
         * @private
         */
        this.logs = [];
    }


    /**
     * Set the log level for the logger.
     *
     * @param {('INFO'|'DEBUG'|'WARN')} level - The desired log level.
     *
     * @returns {void}
     *
     * @example
     * LoggerBase.setLogLevel('DEBUG'); // Sets the log level to 'DEBUG'
     * LoggerBase.setLogLevel('INFO');  // Sets the log level to 'INFO'
     * LoggerBase.setLogLevel('WARN');  // Sets the log level to 'WARN'
     *
     * @output
     * // No output in the console. Updates the log level for subsequent log entries.
     *
     * @description
     * The `setLogLevel` function allows the user to set the log level for the logger.
     * It takes a `level` parameter representing the desired log level and validates it using the `validateLogLevel` method.
     * The function then updates the log level property of the logger, affecting the severity of subsequent log entries.
     */
    setLogLevel(level) {
        validator._validateLogLevel({ level });
        this.level = level;
    }


    /**
     * Get the log level from a log message.
     *
     * @param {string} logMessage - The log message from which to extract the log level.
     *
     * @returns {('INFO'|'DEBUG'|'WARN')} The log level extracted from the log message.
     *
     * @example
     * const logMessage = 'INFO - This is an informational log message.';
     * const level = LoggerBase.getLogLevel(logMessage); // Returns 'INFO'
     *
     * @output
     * // No output in the console. Returns the log level extracted from the log message.
     *
     * @description
     * The `getLogLevel` function extracts the log level from a given log message.
     * It takes a `logMessage` parameter, typically in the format 'LOG_LEVEL - Log message content'.
     * The function splits the log message using the separator ' - ' and extracts the first part, which represents the log level.
     * The extracted log level is then returned, mapping it to the predefined log levels using the `LOG_LEVELS` object.
     */
    getLogLevel(logMessage) {

        const parts = logMessage.split(' - ');

        const logLevel = parts[0];

        return LOG_LEVELS[logLevel];

    }


    /**
     * Format a log message with its log level.
     *
     * @param {string} msg - The log message content.
     * @param {('INFO'|'DEBUG'|'WARN')} level - The log level associated with the log message.
     *
     * @returns {string} The formatted log message with its log level.
     *
     * @example
     * const message = 'This is a log message.';
     * const logLevel = 'INFO';
     * const formattedMessage = LoggerBase.format(message, logLevel); // Returns '[INFO] - This is a log message.'
     *
     * @output
     * // No output in the console. Returns the formatted log message with its log level.
     *
     * @description
     * The `format` function takes a log message content (`msg`) and its associated log level (`level`).
     * It returns a formatted log message with the log level enclosed in square brackets, followed by a hyphen and the log message content.
     * This function is useful for creating standardized log entries with consistent formatting.
     */
    format(msg, level) {
        return `[${level}] - ${msg}`;
    }


    /**
     * Check if a given log level is valid.
     *
     * @param {string} level - The log level to check for validity.
     *
     * @returns {boolean} `true` if the log level is valid, `false` otherwise.
     *
     * @example
     * const logLevel = 'INFO';
     * const isValid = LoggerBase.isValidLogLevel(logLevel); // Returns true
     *
     * @output
     * // No output in the console. Returns a boolean indicating whether the log level is valid.
     *
     * @description
     * The `isValidLogLevel` function checks whether a given log level is valid.
     * It compares the provided log level with the valid log levels defined in the `LOG_LEVELS` object.
     * If the log level is found in the valid log levels, the function returns `true`; otherwise, it returns `false`.
     * This function is useful for ensuring that only valid log levels are used in the application.
     */
    isValidLogLevel(level) {
        return Object.values(LOG_LEVELS).includes(level);
    }


    /**
     * Add a log entry with the specified message and log level.
     *
     * @param {string} message - The log message to be added.
     * @param {string} [level=LOG_LEVELS.INFO] - The log level associated with the message.
     *
     * @returns {void}
     *
     * @example
     * const logMessage = 'This is an info message.';
     * const logLevel = 'INFO';
     * LoggerBase.addLog(logMessage, logLevel);
     *
     * @output
     * // No output in the console. Adds the log entry to the logs array.
     *
     * @description
     * The `addLog` function adds a log entry to the logger instance.
     * It takes two parameters: `message`, which is the log message, and `level`, which is the log level associated with the message.
     * If no log level is provided, it defaults to 'INFO'.
     * The function validates the log level and log message using the `validator` instance.
     * It constructs the final log message by combining the log level, timestamp, and message.
     * The log entry is then added to the `logs` array, but only if its log level is equal to or higher than the logger's current log level.
     */
    addLog(message, level = LOG_LEVELS.INFO) {

        validator._validateLogLevel({ level });
        validator._validateLogMessage({ message });

        const timestamp = new Date().toISOString();

        const levelIndex = Object.keys(LOG_LEVELS).indexOf(level.toString());
        const levelConstructorIndex = Object.keys(LOG_LEVELS).indexOf(this.level.toString());

        if (levelIndex < levelConstructorIndex) {
            return;
        }

        let finalMessage = `${level} - ${timestamp} - ${message}`;

        this.logs.push(finalMessage);

    }


    /**
     * Get the array of log entries.
     *
     * @returns {Array<string>} - An array containing log entries.
     *
     * @example
     * const logs = LoggerBase.getLogs();
     * console.log(logs);
     *
     * @output
     * // Output will be an array of log entries.
     *
     * @description
     * The `getLogs` function returns the array of log entries stored in the logger instance.
     * You can use this function to retrieve and inspect the log entries without modifying the logger state.
     */
    getLogs() {
        return this.logs;
    }


    /**
     * Clear all log entries.
     *
     * @returns {void}
     *
     * @example
     * LoggerBase.clearLogs();
     *
     * @output
     * // The logs array is cleared.
     *
     * @description
     * The `clearLogs` function empties the array of log entries in the logger instance.
     * After calling this function, the logger will have no log entries.
     */
    clearLogs() {
        this.logs = [];
    }


    /**
     * Print all log entries to the console.
     *
     * @returns {void}
     *
     * @example
     * LoggerBase.printLogs();
     *
     * @output
     * // Log entries are printed to the console.
     *
     * @description
     * The `printLogs` function iterates through all log entries in the logger instance and prints each entry to the console.
     * Each log entry is printed on a new line.
     */
    printLogs() {
        this.logs.forEach((log) => {
            console.log(`${log}`);
        });
    }


    /**
     * Logs all the available functions (static and non-static) in the LoggerBase class to the console.
     *
     * @return {void}
     *
     * @example
     *  Example usage:
     *  LoggerBase.logAvailableFunctions();
     *
     * @description
     * This method logs all the available functions (static and non-static) in the AuditLogger class to the console.
     */
    static logAvailableFunctions() {
        const functionNames = Object.getOwnPropertyNames(LoggerBase).filter(name => typeof LoggerBase[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');
        const nonStaticFunctionNames = Object.getOwnPropertyNames(LoggerBase.prototype).filter(name => typeof LoggerBase.prototype[name] === 'function' && name !== 'constructor');

        console.log("*************************************************");
        console.log(`Available static functions in LoggerBase class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
        console.log("*************************************************");
        console.log("");
        console.log(`\nAvailable non-static functions in LoggerBase class:`);
        nonStaticFunctionNames.forEach(name => console.log(`- ${name}`));
    }
}

// Export the LoggerBase and LOG_LEVELS modules.
export { LoggerBase };
export { LOG_LEVELS };