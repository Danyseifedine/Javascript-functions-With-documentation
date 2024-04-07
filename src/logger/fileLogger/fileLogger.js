import { LoggerBase } from "../base/loggerBase";
import { saveAs } from 'file-saver';
import { LoggerValidation as VALIDATE_LOGGER } from "../validator/validation.js"


/**
 * Validator instance for validating file names and log levels.
 * @type {VALIDATE_LOGGER}
 */
const validator = new VALIDATE_LOGGER();


/**
 * File system based logger class. Logs messages to a file and provides methods to download log files.
 * 
 * Can set log level threshold to control which log messages are saved. 
 * Logs timestamp and log level with each message.
 *
 * Provides methods to download complete logs or logs filtered by log level.
 *
 * @class FileLogger
 * @extends LoggerBase
 */
class FileLogger extends LoggerBase {

    /**
     * Create new FileLogger instance.
     *
     * Validates and saves fileName provided.
     *
     * @param {string} fileName - Name of file to save logs to.
     * @throws {Error} If the provided fileName is invalid.
     *
     * The fileName parameter is required and should be a non-empty string.
     * The fileName will be used as the name of the log file.
     * The fileName will be validated using the `_validateFileName` method of the `validator` instance.
     * If the fileName is invalid, an error will be thrown.
     */
    constructor(fileName) {

        // Call super constructor
        super();

        // Validate filename
        validator._validateFileName({ fileName });

        // Save filename
        this.fileName = fileName;
    }


    /**
     * @param {string} fileName - The new file name to save logs to.
     * 
     * @throws {Error} If the provided `fileName` is invalid.
     * 
     * @return {void}
     * 
     * @output This method sets the filename to the value of the `fileName` parameter.
     * 
     * @example
     * const logger = new FileLogger('my-log.txt');
     * logger.setFileName('new-log-file.txt');
     * 
     * @description The `setFileName` method sets the filename to the value of the `fileName` parameter.
     *
     * The `fileName` parameter is required and should be a non-empty string.
     * The `fileName` will be validated using the `_validateFileName` method of the `validator` instance.
     * If the `fileName` is invalid, an error will be thrown.
     *
     * The `setFileName` method is useful when you want to change the name of the log file that logs are saved to.
     * This can be useful if you want to save logs to a different file or if you want to start a new log file.
     *
     */
    setFileName(fileName) {

        validator._validateFileName({ fileName });
        this.fileName = fileName;
    }


    /**
     * Download the current logs as a text file and optionally clear logs after download.
     *
     * @param {boolean} [clearLogsAfterDownload=true] - Indicates whether to clear logs after download.
     *
     * @returns {void}
     *
     * @example
     * FileLogger.downloadLogs(); // Downloads logs and clears logs afterward
     * FileLogger.downloadLogs(false); // Downloads logs without clearing logs afterward
     *
     * @output
     * // No output in the console. Initiates a download of a text file containing logs.
     *
     * @description
     * The `downloadLogs` function allows the user to download the current logs as a text file.
     * The function takes an optional parameter `clearLogsAfterDownload` (default is `true`), which, if set to `true`, clears the logs after initiating the download.
     * If there are no logs to download, a warning message is logged to the console.
     * The logs are joined into a single string with newline separators, and a Blob is created with the specified MIME type ('text/plain').
     * The Blob is then saved as a text file using the `saveAs` function.
     * If `clearLogsAfterDownload` is `true`, the `clearLogs` function is called to remove the logs after the download.
     */
    downloadLogs(clearLogsAfterDownload = true) {

        if (this.logs.length === 0) {
            console.warn('No logs to download.');
            return;
        }

        const logContent = this.logs.join('\n');

        const blob = new Blob([logContent], { type: 'text/plain' });

        saveAs(blob, this.fileName);

        if (clearLogsAfterDownload) {
            this.clearLogs();
        }

    }


    /**
     * Download logs for a specific log level as a text file.
     *
     * @param {('INFO'|'DEBUG'|'WARN')} level - The log level for which logs should be downloaded.
     *
     * @returns {void}
     *
     * @example
     * FileLogger.downloadLogsByLevel('DEBUG'); // Downloads logs for the 'DEBUG' level
     * FileLogger.downloadLogsByLevel('INFO'); // Downloads logs for the 'INFO' level
     * FileLogger.downloadLogsByLevel('WARN'); // Downloads logs for the 'WARN' level
     *
     * @output
     * // No output in the console. Initiates a download of a text file containing filtered logs.
     *
     * @description
     * The `downloadLogsByLevel` function allows the user to download logs for a specific log level as a text file.
     * It takes a `level` parameter representing the desired log level and validates it using the `validateLogLevel` method.
     * Logs with the specified log level are filtered from the existing logs array.
     * If no logs are found for the specified level, a warning message is logged to the console.
     * The filtered logs are then joined into a single string with newline separators, and a Blob is created with the specified MIME type ('text/plain').
     * The Blob is saved as a text file using the `saveAs` function, with the filename including both the original filename and the log level.
     */
    downloadLogsByLevel(level) {

        validator._validateLogLevel({ level });

        let filteredLogs = this.logs.filter(log => {
            return this.getLogLevel(log) === level;
        });

        if (filteredLogs.length === 0) {
            console.warn(`No logs found for level: ${level}`);
            return;
        }

        let logContent = filteredLogs.join('\n');

        const blob = new Blob([logContent], { type: 'text/plain' });

        saveAs(blob, `${this.fileName}-${level}.txt`);

    }


    /**
     * Logs all the available functions (static and non-static) in the FileLogger class to the console.
     *
     * @return {void}
     *
     * @example
     *  Example usage:
     *  FileLogger.logAvailableFunctions();
     *
     * @description
     * This method logs all the available functions (static and non-static) in the AuditLogger class to the console.
     */
    static logAvailableFunctions() {
        const functionNames = Object.getOwnPropertyNames(FileLogger).filter(name => typeof FileLogger[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');
        const nonStaticFunctionNames = Object.getOwnPropertyNames(FileLogger.prototype).filter(name => typeof FileLogger.prototype[name] === 'function' && name !== 'constructor');

        console.log("*************************************************");
        console.log(`Available static functions in FileLogger class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
        console.log("*************************************************");
        console.log("");
        console.log(`\nAvailable non-static functions in FileLogger class:`);
        nonStaticFunctionNames.forEach(name => console.log(`- ${name}()`));
    }
}


export { FileLogger }