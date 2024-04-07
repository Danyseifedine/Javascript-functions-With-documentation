import { LoggerBase } from '../base/loggerBase.js'; // Importing the base logger class
import { EventEmitter } from 'events'; // Importing EventEmitter class from Node.js 'events' module
import { LoggerValidation as VALIDATE_LOGGER } from "../validator/validation.js" // Importing the logger validation module

/**
 * Validator instance for validating file names and log levels.
 * @type {VALIDATE_LOGGER}
 */const validator = new VALIDATE_LOGGER();


/**
 * EventLogger class extends LoggerBase class and provides event-based logging functionality.
 *
 * This class is used to log messages with a specified level and emit custom events with a specified payload.
 * It also allows adding listeners for custom events and removing them.
 *
 * The class uses the EventEmitter class from the Node.js 'events' module to handle event emissions and listeners.
 */
class EventLogger extends LoggerBase {

    constructor() {
        super(); // Calling the constructor of the parent class LoggerBase
        // Creating a new instance the EventEmitter class
        this.emitter = new EventEmitter();
    }


    /**
     * Log a message with a specified level
     *
     * @param {string} message - The message to log to the console.
     * @param {('DEBUG'|'INFO'|'WARN'|'ERROR')} level - The level of the log message.
     *
     * @returns {void}
     *
     * @example
     * EventLogger.log('Hello, world!', 'INFO');
     *
     * @output
     * INFO: Hello, world!
     *
     * @description
     * The `log` method logs a message with a specified level.
     * It takes two parameters: `message`, which is the message to log to the console, and `level`, which is the level of the log message.
     * It uses the `addLog` method of the parent class to add the log to the logs array.
     * It then validates the log level using the `_validateLogLevel` method of the `validator` object.
     * Finally, it emits a 'log' event with the log message and level.
     */
    log(message, level) {

        super.addLog(message, level);

        validator._validateLogLevel({ level });

        this.emitter.emit('log', {
            level: level,
            message: message
        });
    }


    /**
     * Emit a custom event with a payload
     *
     * @param {string} event - The name of the custom event.
     * @param {Object} payload - The data to send with the custom event.
     *
     * @returns {void}
     *
     * @example
     * EventLogger.emit('myCustomEvent', { data: 'Hello, world!' });
     *
     * @description
     * The `emit` method emits a custom event with a payload.
     * It takes two parameters: `event`, which is the name of the custom event, and `payload`, which is the data to send with the custom event.
     * It uses the `_validateEmit` method of the `validator` object to validate the event and payload.
     * It then emits the custom event with the payload using the `emit` method of the `emitter` object.
     */
    emit(event, payload) {

        validator._validateEmit({ event, payload });

        this.emitter.emit(event, payload);
    }


    /**
     * Register a listener for a custom event.
     *
     * @param {string} event - The name of the custom event.
     * @param {Function} listener - The function to be called when the custom event is emitted.
     *
     * @returns {void}
     *
     * @example
     * // Register a listener for the custom event 'myCustomEvent'
     * EventLogger.on('myCustomEvent', (payload) => {
     *   console.log('Custom event received:', payload);
     * });
     *
     * @description
     * The `on` method registers a listener function for a custom event. When the specified custom event is emitted using the `emit` method, the registered listener function is called.
     * It takes two parameters: `event`, the name of the custom event, and `listener`, the function to be executed when the event is emitted.
     * The `validator._validateEmittion` method is used internally to validate the event and listener parameters.
     * The registration is done using the `on` method of the `emitter` object.
     */
    on(event, listener) {
        validator._validateEmittion({ event, listener });
        this.emitter.on(event, listener);
    }



    /**
     * Add a one-time listener for a custom event
     *
     * @param {string} event - The name of the custom event.
     * @param {Function} listener - The function to execute when the custom event is emitted.
     *
     * @returns {void}
     *
     * @example
     * EventLogger.once('myCustomEvent', (data) => {
     *   console.log(data.message);
     * });
     *
     * @description
     * The `once` method adds a one-time listener for a custom event.
     * It takes two parameters: `event`, which is the name of the custom event, and `listener`, which is the function to execute when the custom event is emitted.
     * It uses the `_validateEmittion` method of the `validator` object to validate the event and listener.
     * It then adds a one-time listener for the custom event using the `once` method of the `emitter` object.
     * The listener will be executed only once, the next time the custom event is emitted.
     */
    once(event, listener) {
        validator._validateEmittion({ event, listener })

        this.emitter.once(event, listener);
    }


    /**
     * Remove a listener for a custom event
     *
     * @param {string} event - The name of the custom event.
     * @param {Function} listener - The function to remove as a listener for the custom event.
     *
     * @returns {void}
     *
     * @example
     * const listener = (data) => {
     *   console.log(data);
     * };
     *
     * EventLogger.on('myCustomEvent', listener);
     * EventLogger.off('myCustomEvent', listener);
     *
     * @description
     * The `off` method removes a listener for a custom event.
     * It takes two parameters: `event`, which is the name of the custom event, and `listener`, which is the function to remove as a listener for the custom event.
     * It uses the `_validateEmittion` method of the `validator` object to validate the event and listener.
     * It then removes the listener for the custom event using the `off` method of the `emitter` object.
     */
    off(event, listener) {
        validator._validateEmittion({ event, listener })

        this.emitter.off(event, listener);
    }


    /**
     * Remove all listeners for all custom events
     *
     * @returns {void}
     *
     * @example
     * EventLogger.removeAllListeners();
     *
     * @description
     * The `removeAllListeners` method removes all listeners for all custom events.
     * It does not take any parameters.
     * It uses the `removeAllListeners` method of the `emitter` object to remove all listeners for all custom events.
     */
    removeAllListeners() {
        this.emitter.removeAllListeners();
    }


    /**
     * Logs all the available functions (static and non-static) in the EventLogger class to the console.
     *
     * @return {void}
     *
     * @example
     *  Example usage:
     *  EventLogger.logAvailableFunctions();
     *
     * @description
     * This method logs all the available functions (static and non-static) in the AuditLogger class to the console.
     */
    static logAvailableFunctions() {
        const functionNames = Object.getOwnPropertyNames(EventLogger).filter(name => typeof EventLogger[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');
        const nonStaticFunctionNames = Object.getOwnPropertyNames(EventLogger.prototype).filter(name => typeof EventLogger.prototype[name] === 'function' && name !== 'constructor');

        console.log("*************************************************");
        console.log(`Available static functions in EventLogger class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
        console.log("*************************************************");
        console.log("");
        console.log(`\nAvailable non-static functions in EventLogger class:`);
        nonStaticFunctionNames.forEach(name => console.log(`- ${name}()`));
    }
}

// Exporting the EventLogger class
export { EventLogger };
