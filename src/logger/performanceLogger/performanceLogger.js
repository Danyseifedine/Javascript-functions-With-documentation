import { LoggerBase } from '../base/loggerBase.js';
import { LoggerValidation as VALIDATE_LOGGER } from '../validator/validation.js';

const validator = new VALIDATE_LOGGER();

/**
 * Performance logger class for logging performance-related metrics.
 * Extends the functionality of the base logger.
 *
 * @class
 * @extends LoggerBase
 */
class PerformanceLogger extends LoggerBase {

    /**
     * Create a PerformanceLogger instance.
     *
     * @param {('DEBUG'|'INFO'|'WARN')} [level=INFO] - Initial log level.
     *
     * @returns {PerformanceLogger} A new instance of the PerformanceLogger class.
     *
     *
     * @description
     * The constructor initializes a new instance of the `PerformanceLogger` class, which extends the `LoggerBase` class.
     * It takes an optional `level` parameter, which specifies the initial log level.
     * If no level is provided, the default log level is `INFO`.
     */
    constructor(level = 'INFO') {
        super(level);
    }

    /**
         * Measure the time taken by a specific operation.
         *
         * @param {string} label - The name or description of the operation.
         * @param {Function} func - The operation to be measured.
         *
         * @returns {void}
         *
         * @example
         * PerformanceLogger.measureTime('Expensive operation', () => {
         *   // Do something expensive here
         * });
         *
         * @output
         * Expensive operation: 500 milliseconds
         *
         * @description
         * The `measureTime` function measures the time taken by a specific operation.
         * It takes two parameters: `operationName`, which is a string describing the operation, and `callback`, which is a function that performs the operation.
         * The function starts a timer using the `performance.now()` method, executes the `callback` function, and then stops the timer.
         * The elapsed time is then calculated and logged using the `push` method of the `logs` array.
         */
    measureTime(label, func) {
        const startTime = performance.now();
        func();
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;

        const log = `${label}: ${elapsedTime} milliseconds`;
        this.logs.push(log);
    }


    /**
    * Log the current memory usage.
    *
    * @returns {void}
    *
    * @example
    * PerformanceLogger.logMemoryUsage();
    *
    * @output
    * Memory Usage: {usedJSHeapSize: 123456, totalJSHeapSize: 123456, jsHeapSizeLimit: 123456}
    *
    * @description
    * The `logMemoryUsage` function logs the current memory usage of the JavaScript heap.
    * It uses the `performance.memory` property to get the current memory usage, and then logs a message to the console indicating the current memory usage.
    * The `performance.memory` property returns an object with the following properties:
    * - `usedJSHeapSize`: The current size of the JavaScript heap in bytes.
    * - `totalJSHeapSize`: The maximum size of the JavaScript heap in bytes.
    * - `jsHeapSizeLimit`: The maximum size of the JavaScript heap in bytes that can be used by the JavaScript runtime.
    */
    static logMemoryUsage() {
        const memoryUsage = performance.memory;
        const log = `Memory Usage: ${JSON.stringify(memoryUsage)}`;
        return log;
    }


    /**
     * Log the current frames per second (FPS) in the browser.
     *
     * @returns {void}
     *
     * @example
     * PerformanceLogger.logFPS();
     *
     * @output Frames Per Second:60.00
     *
     * @description
     * The `logFPS` function logs the current frames per second (FPS) in browser.
     * It uses the `performance.now()` method to get the current time in milliseconds, and then logs a message to the console indicating the current FPS.
     * Note that this method does not actually calculate the FPS, it simply logs the current time in milliseconds and labels it as FPS.
     */
    static logFPS() {
        const fps = performance.now();
        const log = `Frames Per Second: ${fps.toFixed(2)}`;
        return log;
    }


    /**
     * Log the time taken for a function to execute multiple times.
     *
     * @param {string} functionName - The name or description of the function
     * @param {Function} callback - The function to be measured.
     * @param {number} iterations - The number of iterations to execute the function.
     *
     * @returns {void}
     *
     * @example
     * PerformanceLogger.measureIterationsTime('My Function', () => {
     *   console.log('Hello, world!');
     * }, 1000);
     *
     * @output
     * My Function (1000 iterations): 0.001 milliseconds per iteration
     *
     * @description
     * The `measureIterationsTime` function measures the time taken for a function to execute multiple times.
     * It takes three parameters: `functionName`, which is a string describing the function, `callback`, which is the function to be measured, and `iterations`, which is the number of times to execute the function.
     * The function starts a timer using the `performance.now()` method, executes the `callback` function for the specified number of `iterations`, and then stops the timer.
     * The total time taken is calculated, as well as the average time per iteration, and both are logged using the `push` method of the `logs` array.
     */
    measureIterationsTime(Label, func, iterations) {
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            func();
        }
        const end = performance.now();
        const totalTime = end - start;
        const averageTime = totalTime / iterations;

        const log = `${Label} (${iterations} iterations): ${averageTime * 1000} milliseconds per iteration`;
        this.logs.push(log);
    }


    /**
   * Log the time taken for a forEach operation on an array.
   *
   * @param {string} arrayName - The name or description of the array.
   * @param {Array} array - The array to iterate over.
   * @param {Function} callback - The function to be executed for each element.
   *
   * @returns {void}
   *
   * @example
   * PerformanceLogger.measureForEachTime('My Array', [1, 2, 3], (element) => {
   *   console.log(element);
   * });
   *
   * @output
   * forEach on My Array: 3 milliseconds
   *
   * @description
   * The `measureForEachTime` function measures the time taken for a `forEach` operation on an array.
   * It takes three parameters: `label`, which is a string describing the array, `array`, which is the array to iterate over, and `function`, which is a function that is executed for each element in the array.
   * The function starts a timer using the `performance.now()` method, performs the `forEach` operation, and then stops the timer.
   * The elapsed time is then calculated and logged using the `push` method of the `logs` array.
   */
    measureForEachTime(Label, array, func) {
        const startTime = performance.now();

        array.forEach(func);

        const endTime = performance.now();
        const elapsedTime = endTime - startTime;

        const log = `forEach on ${Label}: ${elapsedTime} milliseconds`;
        this.logs.push(log);
    }

    /**
     * Log the time taken for the page to load.
     *
     * @returns {void}
     *
     * @example
     * PerformanceLogger.logPageLoadTime();
     *
     * @output
     * Page Load Time: 1234 milliseconds
     *
     * 
     * @description
     * The `logPageLoadTime` function logs the time taken for page to load.     * It uses the `performance.timing` object to get the time taken for the page load, and then logs a message to the console indicating the page load time in milliseconds.
     * The `performance.timing` object contains various timing-related information about the page load, including the time taken for the navigation to start, the time taken for the DOM to be parsed, and the time taken for the page to be fully loaded.
     * The `loadEventEnd` property represents the time when the load event is fired, after the page has finished loading.
     * The `navigationStart` property represents the time when the navigation to the page started.
     * The difference between these two properties gives the total time taken for the page to load.
     */
    logPageLoadTime() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        const log = `Page Load Time: ${loadTime} milliseconds`;
        this.logs.push(log);
    }


    /**
     * Log the time taken for a specific resource to load.
     *
     * @param {string} resourceName - The name of the resource log the load time for.
     *
     * @returns {void}
     *
     * @example
     * PerformanceLogger.logResourceLoadTime('style.css');
     *
     * @output
     * style.css Load Time: 123 milliseconds
     *
     * @description
     * The `logResourceLoadTime` function logs the time taken for a specific resource to load.
     * It takes one parameter: `resourceName`, which is the name of the resource to log the load time for.
     * It uses the `performance.getEntriesByName` method to get an array of performance entries for the specified resource, and then logs a message to the console indicating the load time in milliseconds.
     * If the resource is not found, it logs an error message to the console.
     * The `performance.getEntriesByName` method returns an array of performance entries that match the specified name.
     * Each performance entry contains various timing-related information about the resource, including the time taken for the resource to start loading, the time taken for the resource to be received, and the time taken for the resource to be parsed.
     * The `duration` property represents the total time taken for the resource to load.
     */
    logResourceLoadTime(resourceName) {
        const entries = performance.getEntriesByName(resourceName);
        if (entries.length > 0) {
            const loadTime = entries[0].duration;
            const log = `${resourceName} Load Time: ${loadTime} milliseconds`;
            this.logs.push(log);
        } else {
            console.error(`Resource "${resourceName}" not found.`);
        }
    }


    /**
     * Logs all the available functions (static and non-static) in the PerformanceLogger class to the console.
     *
     * @return {void}
     *
     * @example
     *  Example usage:
     *  PerformanceLogger.logAvailableFunctions();
     *
     * @description
     * This method logs all the available functions (static and non-static) in the AuditLogger class to the console.
     */
    static logAvailableFunctions() {
        const functionNames = Object.getOwnPropertyNames(PerformanceLogger).filter(name => typeof PerformanceLogger[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');
        const nonStaticFunctionNames = Object.getOwnPropertyNames(PerformanceLogger.prototype).filter(name => typeof PerformanceLogger.prototype[name] === 'function' && name !== 'constructor');

        console.log("*************************************************");
        console.log(`Available static functions in PerformanceLogger class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
        console.log("*************************************************");
        console.log("");
        console.log(`\nAvailable non-static functions in PerformanceLogger class:`);
        nonStaticFunctionNames.forEach(name => console.log(`- ${name}()`));
    }
}

export { PerformanceLogger };
