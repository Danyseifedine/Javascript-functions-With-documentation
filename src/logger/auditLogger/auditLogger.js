import { LoggerBase } from '../base/loggerBase.js';
import { saveAs } from 'file-saver';
import { ConsoleLogger } from '../consoleLogger/consoleLogger.js';

/**
 * Audit logger class for capturing and logging actions for auditing purposes.
 * Extends the functionality of the base logger.
 *
 * @class
 * @extends LoggerBase
 */
class AuditLogger extends LoggerBase {

    /**
     * Create an AuditLogger instance.
     *
     * @param {string} auditLogPath - The path or destination for storing audit logs.
     * @param {boolean} [logRotation=false] - Whether log rotation is enabled.
     * @param {number} [maxLogs=10] - Maximum number of logs to keep when log rotation is enabled.
     *
     * @returns {AuditLogger} A new instance of the AuditLogger class.
     *
     * @example
     * const auditLogger = new AuditLogger('/path/to/audit/logs', true, 10);
     *
     * @description
     * The constructor initializes a new instance of the `AuditLogger` class, which extends the `LoggerBase` class.
     * It requires an `auditLogPath` parameter, which specifies the path or destination for storing audit logs.
     * The optional parameters `logRotation` and `maxLogs` can be used to enable log rotation and set the maximum number of logs to keep.
     */
    constructor(auditLogPath, logRotation = false, maxLogs = 10, saveIntoFile = true) {
        super();
        this.auditLogPath = auditLogPath;
        this.logRotation = logRotation;
        this.maxLogs = maxLogs;
        this.saveIntoFile = saveIntoFile;
    }


    /**
     * Log an auditable action.
     *
     * @param {string} action - The auditable action to log.
     * @param {object} metadata - Additional metadata or details related to the auditable action.
     *
     * @returns {void}
     *
     * @example
     * Example usage:
     * const auditLogger = new AuditLogger('/path/to/audit/logs', true, 10);
     * auditLogger.logAuditAction('User login', { username: 'john_doe', ipAddress: '192.168.1.100' });
     *
     * @output
     * // If logToFileSystem is true:
     * // Storing audit log at /path/to/audit/logs: 2022-01-09T12:00:00.000Z - User login - {"username":"john_doe","ipAddress":"192.168.1.100"}
     *
     * // If logToFileSystem is false:
     * // 2022-01-09T12:00:00.000Z - User login - {"username":"john_doe","ipAddress":"192.168.1.100"}
     *
     * @description
     * The `logAuditAction` function logs an auditable action along with additional metadata.
     * It captures actions for compliance and accountability.
     * The log can be saved to the file system or logged to the console based on the configuration.
     */
    logAuditAction(action, metadata) {
        const timestamp = new Date().toISOString();
        const log = `${timestamp} - ${action} - ${JSON.stringify(metadata)}`;
        if (this.saveIntoFile) {
            this.logToFileSystem(log);
        } else {
            ConsoleLogger.log(log);
        }
    }



    /**
     * Save a log entry to the file system.
     *
     * @param {string} log - The log entry to be saved.
     *
     * @returns {void}
     *
     * @example
     * Example usage:
     * const auditLogger = new AuditLogger('/path/to/audit/logs', true, 10);
     * auditLogger.logToFileSystem('2022-01-09T12:00:00.000Z - User login - {"username":"john_doe","ipAddress":"192.168.1.100"}');
     *
     * @description
     * The `logToFileSystem` function saves a log entry to the file system using the 'file-saver' library.
     * It creates a Blob from the log entry and triggers the download using the `saveAs` function.
     * If log rotation is enabled, it checks and rotates logs if needed based on the configured maximum logs.
     */
    logToFileSystem(log) {
        const blob = new Blob([`${log}\n`], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, this.auditLogPath, { autoBom: true });

        if (this.logRotation) {
            this.rotateLogsIfNeeded();
        }
    }


    /**
     * Rotate logs if the number of logs exceeds the maximum allowed.
     *
     * @returns {void}
     *
     * @example
     * Automatically called when log rotation is enabled and the maximum logs are exceeded.
     * auditLogger.rotateLogsIfNeeded();
     *
     * @description
     * The `rotateLogsIfNeeded` function checks if the number of logs exceeds the maximum allowed.
     * If the condition is met, it removes old logs beyond the maximum allowed to control log storage size.
     */
    rotateLogsIfNeeded() {
        if (this.logs.length > this.maxLogs) {
            this.logs.splice(0, this.logs.length - this.maxLogs);
        }
    }


    /**
     * Log a security incident.
     *
     * @param {string} action - The description of the security incident.
     * @param {object} metadata - Additional metadata or details related to the security incident.
     *
     * @returns {void}
     *
     * @example
     * auditLogger.logSecurityIncident('Unauthorized access attempt', { ipAddress: '192.168.1.100' });
     *
     * @output
     * Depending on the configuration:
     * - If saving to the file system, the security incident log is stored at the specified path.
     * - If logging to the console, the security incident log is displayed in the console.
     *
     * @description
     * The `logSecurityIncident` function logs a security incident along with additional metadata.
     * It captures security-related events or suspicious activities in an application.
     * The log can be saved to the file system or logged to the console based on the configuration.
     */
    logSecurityIncident(action, metadata) {
        const timestamp = new Date().toISOString();
        const log = `${timestamp} - SECURITY INCIDENT - ${action} - ${JSON.stringify(metadata)}`;
        if (this.saveIntoFile) {
            this.logToFileSystem(log);
        } else {
            ConsoleLogger.log(log);
        }
    }


    /**
     * Log user activity.
     *
     * @param {string} username - The username associated with the user activity.
     * @param {string} activity - The description of the user activity.
     *
     * @returns {void}
     *
     * @example
     * auditLogger.logUserActivity('john_doe', 'Viewed profile page');
     *
     * @output
     * Depending on the configuration:
     * - If saving to the file system, the user activity log is stored at the specified path.
     * - If logging to the console, the user activity log is displayed in the console.
     *
     * @description
     * The `logUserActivity` function logs user activity along with the associated username and activity description.
     * It captures actions performed by users in the application.
     * The log can be saved to the file system or logged to the console based on the configuration.
     */
    logUserActivity(username, activity) {
        const timestamp = new Date().toISOString();
        const log = `${timestamp} - USER ACTIVITY - ${username} - ${activity}`;
        if (this.saveIntoFile) {
            this.logToFileSystem(log);
        } else {
            ConsoleLogger.log(log);
        }
    }


    /**
     * Log a system error.
     *
     * @param {string} errorMessage - The error message associated with the system error.
     * @param {string} stackTrace - The stack trace related to the system error.
     *
     * @returns {void}
     *
     * @example
     * auditLogger.logSystemError('Critical issue', 'Error in file.js at line 42');
     *
     * @output
     * Depending on the configuration:
     * - If saving to the file system, the system error log is stored at the specified path.
     * - If logging to the console, the system error log is displayed in the console as an error message.
     *
     * @description
     * The `logSystemError` function logs a system error along with the associated error message and stack trace.
     * It is used to capture critical issues or errors in the application.
     * The log can be saved to the file system or logged to the console based on the configuration.
     */
    logSystemError(errorMessage, stackTrace) {
        const timestamp = new Date().toISOString();
        const log = `${timestamp} - SYSTEM ERROR - ${errorMessage}\n${stackTrace}`;
        if (this.saveIntoFile) {
            this.logToFileSystem(log);
        } else {
            console.error(log);
        }
    }


    /**
     * Log a data access event.
     *
     * @param {string} entity - The entity or data being accessed.
     * @param {string} action - The action or operation performed on the data (e.g., read, write).
     * @param {string} user - The user responsible for the data access event.
     *
     * @returns {void}
     *
     * @example
     * auditLogger.logDataAccessEvent('Customer', 'Read', 'john_doe');
     *
     * @output
     * Depending on the configuration:
     * - If saving to the file system, the data access event log is stored at the specified path.
     * - If logging to the console, the data access event log is displayed in the console.
     *
     * @description
     * The `logDataAccessEvent` function logs a data access event, capturing details such as the entity, action, and user.
     * It is used for auditing and tracking data access activities in the application.
     * The log can be saved to the file system or logged to the console based on the configuration.
     */
    logDataAccessEvent(entity, action, user) {
        const timestamp = new Date().toISOString();
        const log = `${timestamp} - DATA ACCESS - ${action} on ${entity} by ${user}`;
        if (this.saveIntoFile) {
            this.logToFileSystem(log);
        } else {
            ConsoleLogger.log(log);
        }
    }


    /**
     * Log an authorization event.
     *
     * @param {string} user - The user for whom the authorization event is logged.
     * @param {string} resource - The resource or feature being accessed.
     * @param {boolean} success - A boolean indicating whether the access was granted (true) or denied (false).
     *
     * @returns {void}
     *
     * @example
     * auditLogger.logAuthorizationEvent('john_doe', 'Admin Panel', true);
     *
     * @output
     * Depending on the configuration:
     * - If saving to the file system, the authorization event log is stored at the specified path.
     * - If logging to the console, the authorization event log is displayed in the console.
     *
     * @description
     * The `logAuthorizationEvent` function logs an authorization event, capturing details such as the user, resource, and access status.
     * It is used for auditing and tracking authorization activities in the application.
     * The log can be saved to the file system or logged to the console based on the configuration.
     */
    logAuthorizationEvent(user, resource, success) {
        const timestamp = new Date().toISOString();
        const status = success ? 'GRANTED' : 'DENIED';
        const log = `${timestamp} - AUTHORIZATION - ${status} access to ${resource} for user: ${user}`;
        if (this.saveIntoFile) {
            this.logToFileSystem(log);
        } else {
            ConsoleLogger.log(log);
        }
    }


    /**
     * Logs all the available functions (static and non-static) in the AuditLogger class to the console.
     *
     * @return {void}
     *
     * @example
     * // Example usage:
     * // AuditLogger.logAvailableFunctions();
     *
     * @description
     * This method logs all the available functions (static and non-static) in the AuditLogger class to the console.
     */
    static logAvailableFunctions() {
        const functionNames = Object.getOwnPropertyNames(AuditLogger).filter(name => typeof AuditLogger[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');
        const nonStaticFunctionNames = Object.getOwnPropertyNames(AuditLogger.prototype).filter(name => typeof AuditLogger.prototype[name] === 'function' && name !== 'constructor');

        console.log("*************************************************");
        console.log(`Available static functions in AuditLogger class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
        console.log("*************************************************");
        console.log("");
        console.log(`\nAvailable non-static functions in AuditLogger class:`);
        nonStaticFunctionNames.forEach(name => console.log(`- ${name}`));
    }
}

export { AuditLogger };
