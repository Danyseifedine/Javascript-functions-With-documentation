import { LoggerBase } from "../base/loggerBase";


/**
 * ConsoleLogger extends the functionality of the base, providing a versatile solution
 * for messages, data,, errors, and to the browser console. inherits from the Logger
 * class, building upon its core features while adding specific methods tailored for console logging.
 *
 * @class ConsoleLogger
 * @extends LoggerBase
 */

class ConsoleLogger extends LoggerBase {

    /**
     * Constructor for the ConsoleLogger class. It initializes the logger instance and a counts object
     * to keep track of the number of times specific labels have been logged.
     *
     * @constructor
     */
    constructor() {
        super();
        this.counts = {};
    }



    /**
     * Log a message to the console
     *
     * @param {string} message - The message to log to the console.
     * @returns {void}
     *
     * @example
     * ConsoleLogger.log('Hello, world!');
     *
     * @output
     * Hello, world!
     *
     * @description
     * The `log` method logs a message to the console.
     * It takes one parameter: `message`, which is the message to log to the console.
     * It uses the `console.log` method to log the message to the console.
     */
    static log(message) {
        console.log(message);
    }


    /**
     * Logs tabular data by printing array of objects. 
     * Converts objects into table format for readability.
     *
     * @param {Array<Object>} data - The data to display in the table.
     * 
     * @returns {void}
     * 
     * @example
     * ConsoleLogger.logTable([
     *  { name: 'John', age: 30 },
     *  { name: 'Jane', age: 25 }
     * ]);
     * // Output:
     * // ┌───────┬───────┬───────┐
     * // │ name  │ age   │ (idx) │
     * // ├───────┼───────┼───────┤
     * // │ John  │ 30    │ 0     │
     * // ├───────┼───────┼───────┤
     * // │ Jane  │ 25    │ 1     │
     * // └───────┴───────┴───────┘
     * 
     * @description
     * The `logTable` method logs a table to the console.
     * It takes one parameter: `data`, which is an array of objects to display in the table.
     * It uses the `console.table` method to log the table to the console.
     * Each object in the array should have the same keys, which will be used as the column headers in the table.
 */
    static logTable(data) {
        console.table(data);
    }


    /**
     * Start a new console group with a label
     *
     * @param {string} label - The label for the console group.
     *
     * @returns {void}
     *
     * @example
     * ConsoleLogger.logGroup('My Group');
     * ConsoleLogger.log('Message 1');
     * ConsoleLogger.log('Message 2');
     * ConsoleLogger.logEndGroup();
     *
     * @output
     * -My Group:
     *   Message 1
     *   Message 2
     * End Group My Group
     *
     * @description
     * The `logGroup` method starts a new console group with a label.
     * It takes one parameter: `label`, which is the label for the console group.
     * It uses the `console.group` method to start the console group with the specified label.
     * All subsequent log messages will be indented and grouped under the label until the `logEndGroup` method is called.
     */
    static logGroup(label) {
        console.group(label);
    }


    /**
     * Log a warning message to the
     *
     * @param {string} msg - The warning message to log to the console.
     *
     * @returns {void}
     *
     * @example
     * ConsoleLogger.logWarning('Warning: Operation may fail if not executed in a secure environment.');
     *
     * @output
     * Warning: Operation may fail if not executed in a secure environment.
     *
     * @description
     * The `logWarning` method logs a warning message to the console.
     * It takes one parameter: `msg`, which is the warning message to log to the console.
     * It uses the `console.warn` method to log the message to the console.
     */
    static logWarning(msg) {
        console.warn(msg);
    }


    /**
     * Log an error message to the
     *
     * @param {Error|string} err - The error message or Error object to log to the console.
     *
     * @returns {void}
     *
     * @example
     * try {
     *   // some code that may throw an error
     * } catch (err) {
     *   ConsoleLogger.logError(err);
     * }
     *
     * @output
     * Error: An error occurred
     *     at Object.<anonymous> (/path/to/file.js:10:13)
     *     at Module._compile (internal/modules/cjs/loader.js:1063:30)
     *     at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
     *     at Module.load (internal/modules/cjs/loader.js:928:32)
     *     at Function.Module._load (internal/modules/cjs/loader.js:769:14)
     *     at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
     *     at internal/main/run_main_module.js:17:47
     *
     * @description
     * The `logError` method logs an error message to the console.
     * It takes one parameter: `err`, which can be either a string or an Error object.
     * If `err` is an Error object, the method will log the error message, stack trace, and any additional properties of the Error object.
     * If `err` is a string, the method will log the string as an error message.
     * It uses the `console.error` method to log the message to the console.
     */
    static logError(err) {
        console.error(err);
    }


    /**
    * Start a new performance timing with a label
    *
    * @param {string} label - The label for the performance timing.
    *
    * @returns {void}
    *
    * @example
    * ConsoleLogger.timeStamp('My Timing');
    * // some code that takes time to execute
    * ConsoleLogger.timeEnd('My Timing');
    *
    * @output
    * My Timing: 123.456ms
    *
    * @description
    * The `timeStamp` method starts a new performance timing with a label.
    * It takes one parameter: `label`, which is the label for the performance timing.
    * It uses the `console.time` method to start the performance timing with the specified label.
    * You can then use the `timeEnd` method to stop the timing and log the elapsed time.
    */
    static timeStamp(label) {
        console.time(label);
    }


    /**
     * Stop a performance timing with a label and log the elapsed time
     *
     * @param {string} label - The label for the performance timing.
     *
     * @returns {void}
     *
     * @example
     * ConsoleLogger.timeStamp('My Timing');
     * // some code that takes time to execute
     * ConsoleLogger.timeEnd('My Timing');
     *
     * @output
     * My Timing: 123.456ms
     *
     * @description
     * The `timeEnd` method stops a performance timing with a label and logs the elapsed time.
     * It takes one parameter: `label`, which is the label for the performance timing.
     * It uses the `console.timeEnd` method to stop the performance timing with the specified label and log the elapsed time.
     * You must call `timeStamp` with the same label before calling `timeEnd`.
     */
    static timeEnd(label) {
        console.timeEnd(label);
    }


    /**
     * Log an error stack trace to the console
     *
     * @param {Error} error - The error object to log the stack trace for.
     *
     * @returns {void}
     *
     * @example
     * try {
     *   // some code that may throw an error
     * } catch (error) {
     *   ConsoleLogger.trace(error);
     * }
     *
     * @output
     * Error: An error occurred
     *     at Object.<anonymous> (/path/to/file.js:10:13)
     *     at Module._compile (internal/modules/cjs/loader.js:1063:30)
     *     at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
     *     at Module.load (internal/modules/cjs/loader.js:928:32)
     *     at Function.Module._load (internal/modules/cjs/loader.js:769:14)
     *     at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
     *     at internal/main/run_main_module.js:17:47
     *
     * @description
     * The `trace` method logs an error stack trace to the console.
     * It takes one parameter: `error`, which is the error object to log the stack trace for.
     * It uses the `console.trace` method to log the stack trace of the error object.
     */
    static trace(error) {
        console.trace(error);
    }


    /**
     * Clear the console
     *
     * @returns {void}
     *
     * @example
     * ConsoleLogger.clear();
     *
     * @description
     * The `clear` method clears the console.
     * It does not take any parameters.
     * It uses the `console.clear` method to clear the console.
     */
    static clear() {
        console.clear();
    }


    /**
     * Start a new console group with a label, collapsed by default
     *
     * @param {string} label - The label for the console group.
     *
     * @returns {void}
     *
     * @example
     * ConsoleLogger.groupCollapsed('My Group');
     * ConsoleLogger.log('Message 1');
     * ConsoleLogger.log('Message 2');
     * ConsoleLogger.groupEnd();
     *
     * @output
     * My Group (collapsed)
     *   Message 1
     *   Message 2
     * End Group My Group
     *
     * @description
     * The `groupCollapsed` method starts a new console group with a label, collapsed by default.
     * It takes one parameter: `label`, which is the label for the console group.
     * It uses the `console.groupCollapsed` method to start the console group with the specified label, collapsed by default.
     * You can then use the `log` method to log messages to the console group, and the `groupEnd` method to end the console group.
     */
    static groupCollapsed(label) {
        console.groupCollapsed(label);
    }


    /**
     * End a console group
     *
     * @returns {void}
     *
     * @example
     * ConsoleLogger.groupCollapsed('My Group');
     * ConsoleLogger.log('Message 1');
     * ConsoleLogger.log('Message 2');
     * ConsoleLogger.groupEnd();
     *
     * @output
     * My Group (collapsed)
     *   Message 1
     *   Message 2
     * End Group My Group
     *
     * @description
     * The `groupEnd` method ends a console group.
     * It does not take any parameters.
     * It uses the `console.groupEnd` method to end the console group.
     */
    static groupEnd() {
        console.groupEnd()
    }


    /**
     * Log a styled message to the console
     *
     * @param {string} message - The message to log to the console.
     * @param {string} style - The CSS style to apply to the message.
     *
     * @returns {void}
     *
     * @example
     * ConsoleLogger.logStyled('Hello, world!', 'color: red; font-weight: bold;');
     *
     * @output
     * Hello, world!
     *
     * @description
     * The `logStyled` method logs a styled message to the console.
     * It takes two parameters: `message`, which is the message to log to the console, and `style`, which is the CSS style to apply to the message.
     * It uses the `console.log` method to log the styled message to the console.
     */
    static logStyled(message, style) {
        console.log(`%c${message}`, style);
    }


    /**
     * Count the number of times a label has been called and log the result
     *
     * @param {string} label - The label to count.
     *
     * @returns {void}
     *
     * @example
     * logger.count('My Label');
     * logger.count('My Label');
     * logger.count('My Label');
     *
     * @output
     * My Label: 3
     *
     * @description
     * The `count` method counts the number of times a label has been called and logs the result.
     * It takes one parameter: `label`, which is the label to count.
     * It uses an internal `counts` object to keep track of the number of times each label has been called.
     * It then logs the label and the current count to the console.
     */
    count(label) {

        if (!this.counts[label]) {
            this.counts[label] = 0;
        }
        this.counts[label]++;

        this.log(`${label}: ${this.counts[label]}`);
    }


    /**
     * Assert that a condition is true and log an error if it is not
     *
     * @param {boolean} condition - The condition to assert.
     * @param {string} message - The error message to log if the condition is not true.
     *
     * @returns {void}
     *
     * @example
     * ConsoleLogger.assert(array.length > 0, 'Array is empty');
     *
     * @output
     * Error: Array is empty
     *     at Object.<anonymous> (/path/to/file.js:10:13)
     *     at Module._compile (internal/modules/cjs/loader.js:1063:30)
     *     at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
     *     at Module.load (internal/modules/cjs/loader.js:928:32)
     *     at Function.Module._load (internal/modules/cjs/loader.js:769:14)
     *     at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
     *     at internal/main/run_main_module.js:17:47
     *
     * @description
     * The `assert` method asserts that a condition is true and logs an error if it is not.
     * It takes two parameters: `condition`, which is the condition to assert, and `message`, which is the error message to log if the condition is not true.
     * It uses the `console.error` method to log the error message if the condition is not true.
     */
    static assert(condition, message) {
        if (!condition) {
            this.logError(new Error(message));
        }
    }


    /**
     * Log an object in a tree format to the console
     *
     * @param {Object} obj - The object to log to the console.
     *
     * @returns {void}
     *
     * @example
     * ConsoleLogger.dir({ a: 1, b: { c: 3, d: [4, 5] } });
     *
     * @output
     * { a: 1, b: { c: 3, d: [ 4, 5 ] } }
     *
     * @description
     * The `dir` method logs an object in a tree format to the console.
     * It takes one parameter: `obj`, which is the object to log to the console.
     * It uses the `console.dir` method to log the object in a tree format to the console.
     */
    static dir(obj) {
        console.dir(obj);
    }


    /**
     * Logs all the available functions (static and non-static) in the ConsoleLogger class to the console.
     *
     * @return {void}
     *
     * @example
     *  Example usage:
     *  ConsoleLogger.logAvailableFunctions();
     *
     * @description
     * This method logs all the available functions (static and non-static) in the AuditLogger class to the console.
     */
    static logAvailableFunctions() {
        const functionNames = Object.getOwnPropertyNames(ConsoleLogger).filter(name => typeof ConsoleLogger[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');
        const nonStaticFunctionNames = Object.getOwnPropertyNames(ConsoleLogger.prototype).filter(name => typeof ConsoleLogger.prototype[name] === 'function' && name !== 'constructor');

        console.log("*************************************************");
        console.log(`Available static functions in ConsoleLogger class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
        console.log("*************************************************");
        console.log("");
        console.log(`\nAvailable non-static functions in ConsoleLogger class:`);
        nonStaticFunctionNames.forEach(name => console.log(`- ${name}()`));
    }

}

export { ConsoleLogger }