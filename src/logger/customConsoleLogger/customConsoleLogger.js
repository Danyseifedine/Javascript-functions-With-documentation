/**
 * Console color logger class for printing log messages to the console with different colors based on log levels.
 *
 * @class
 */
class CustomConsoleLogger {

    /**
     * Log a message with color to the console.
     *
     * @param {string} message - The log message to be printed.
     * @param {string} color - The color code for the log message.
     *
     * @returns {void}
     *
     * @description
     * The `log` function prints a log message to the console with the specified color.
     * It can be used to visually distinguish log levels based on different colors.
     * The color parameter should be a valid CSS color code.
     */
    static log(message, color) {
        console.log(`%c${message}`, `color: ${color}`);
    }


    /**
     * Log a debug message with a specific color.
     *
     * @param {string} message - The debug message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.debug('This is a debug message');
     *
     * @description
     * The `debug` function logs a debug message with a specific color to the console.
     * It provides a visual distinction for debug-level logs.
     */
    static debug(message) {
        ConsoleColorLogger.log(message, 'blue');
    }


    /**
     * Log an info message with a specific color.
     *
     * @param {string} message - The info message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.info('This is an info message');
     *
     * @description
     * The `info` function logs an info message with a specific color to the console.
     * It provides a visual distinction for info-level logs.
     */
    static info(message) {
        ConsoleColorLogger.log(message, 'green');
    }


    /**
     * Log an error message with a specific color.
     *
     * @param {string} message - The error message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.error('This is an error message');
     *
     * @description
     * The `error` function logs an error message with a specific color to the console.
     * It provides a visual distinction for error-level logs.
     */
    static error(message) {
        ConsoleColorLogger.log(message, 'red');
    }


    /**
     * Log a warning message with a yellow color.
     *
     * @param {string} message - The warning message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.warning('Warning: Potential issue detected');
     *
     * @description
     * The `warning` function logs a warning message with a yellow color to the console.
     * It provides a visual distinction for warning-level logs.
     */
    static warning(message) {
        ConsoleColorLogger.log(message, 'yellow');
    }

    /**
     * Log a success message to the console with green color and bold font weight
     *
     * @param {string} msg - The success message to log to the console.
     *
     * @returns {void}
     *
     * @example
     * ConsoleLogger.logSuccess('Operation completed successfully!');
     *
     * @output
     * Operation completed successfully!
     *
     * @description
     * The `logSuccess` method logs a success message to the console with green color and bold font weight.
     * It takes one parameter: `msg`, which is the success message to log to the console.
     * It uses the `console.log` method to log the message to the console, with a CSS style applied to the message to change the color to green and the font weight to bold.
     */
    static logSuccess(msg) {
        console.log("%c" + msg, "color: green; font-weight: bold");
    }


    /**
     * Log a message with a background color.
     *
     * @param {string} message - The log message to be printed.
     * @param {string} backgroundColor - The background color code for the log message.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.background('This message has a background', '#FFFF00');
     *
     * @description
     * The `background` function logs a message with a specified background color to the console.
     * It allows adding emphasis to the log message with a background color.
     */
    static background(message, backgroundColor) {
        console.log(`%c${message}`, `background: ${backgroundColor}; color: white; padding: 4px; border-radius: 4px`);
    }


    /**
     * Log a message with an underline.
     *
     * @param {string} message - The log message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.underline('This message has an underline');
     *
     * @description
     * The `underline` function logs a message with an underline to the console.
     * It can be used to visually emphasize specific log messages.
     */
    static underline(message) {
        console.log(`%c${message}`, 'text-decoration: underline');
    }


    /**
     * Log a message with a strike-through.
     *
     * @param {string} message - The log message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.strikeThrough('This message has a strike-through');
     *
     * @description
     * The `strikeThrough` function logs a message with a strike-through to the console.
     * It can be used to visually indicate that the log message is deprecated or no longer relevant.
     */
    static strikeThrough(message) {
        console.log(`%c${message}`, 'text-decoration: line-through');
    }


    /**
     * Log a message with a bold font.
     *
     * @param {string} message - The log message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.bold('This is a bold message');
     *
     * @description
     * The `bold` function logs a message with a bold font to the console.
     * It enhances the visual appearance of the log message.
     */
    static bold(message) {
        console.log(`%c${message}`, 'font-weight: bold');
    }


    /**
     * Log a message with an italic font.
     *
     * @param {string} message - The log message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.italic('This is an italic message');
     *
     * @description
     * The `italic` function logs a message with an italic font to the console.
     * It provides a distinct style for the log message.
     */
    static italic(message) {
        console.log(`%c${message}`, 'font-style: italic');
    }


    /**
     * Log a message with a specific font size.
     *
     * @param {string} message - The log message to be printed.
     * @param {string} fontSize - The font size for the log message.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.fontSize('This message has a custom font size', '20px');
     *
     * @description
     * The `fontSize` function logs a message with a specified font size to the console.
     * It allows adjusting the text size for specific log messages.
     */
    static fontSize(message, fontSize) {
        console.log(`%c${message}`, `font-size: ${fontSize}`);
    }


    /**
     * Log a message with a blinking effect.
     *
     * @param {string} message - The log message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.blink('This message blinks');
     *
     * @description
     * The `blink` function logs a message with a blinking effect to the console.
     * It adds a visual dynamic to the log message.
     */
    static blink(message) {
        console.log(`%c${message}`, 'text-decoration: blink');
    }


    /**
     * Log a message with a shadow.
     *
     * @param {string} message - The log message to be printed.
     * @param {string} shadowColor - The color of the shadow.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.shadow('This message has a shadow', 'rgba(0, 0, 0, 0.5)');
     *
     * @description
     * The `shadow` function logs a message with a shadow effect to the console.
     * It provides depth and contrast to the log message.
     */
    static shadow(message, shadowColor) {
        console.log(`%c${message}`, `text-shadow: 2px 2px 2px ${shadowColor}`);
    }


    /**
     * Log a message with a border.
     *
     * @param {string} message - The log message to be printed.
     * @param {string} borderColor - The border color for the log message.
     * @param {string} borderWidth - The border width for the log message.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.border('This message has a border', 'black', '2px');
     *
     * @description
     * The `border` function logs a message with a border to the console.
     * It adds a border around the log message with the specified color and width.
     */
    static border(message, borderColor, borderWidth) {
        console.log(`%c${message}`, `border: ${borderWidth} solid ${borderColor}`);
    }


    /**
     * Log an emphasized message.
     *
     * @param {string} message - The log message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.emphasize('This message is emphasized');
     *
     * @description
     * The `emphasize` function logs an emphasized message to the console.
     * It adds emphasis and a distinctive style to the log message.
     */
    static emphasize(message) {
        console.log(`%c${message}`, 'font-weight: bold; font-style: italic');
    }


    /**
      * Log a message with a typewriter effect.
      *
      * @param {string} message - The log message to be printed.
      *
      * @returns {void}
      *
      * @example
      * ConsoleColorLogger.typewriter('This message has a typewriter effect');
      *
      * @description
      * The `typewriter` function logs a message with a typewriter effect to the console.
      * It simulates the appearance of characters being typed one by one.
      */
    static typewriter(message) {
        let delay = 0;
        for (const char of message) {
            setTimeout(() => {
                console.log(char);
            }, delay);
            delay += 100;
        }
    }


    /**
     * Log a message with a rotating emoji effect.
     *
     * @param {string} message - The log message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.rotateEmoji('This message has a rotating emoji effect');
     *
     * @description
     * The `rotateEmoji` function logs a message with a rotating emoji effect to the console.
     * It uses a set of rotating emojis to add a playful touch to the log message.
     */
    static rotateEmoji(message) {
        const emojis = ['😀', '😎', '🚀', '🌟', '🎉'];
        let index = 0;
        for (const char of message) {
            const emoji = emojis[index % emojis.length];
            console.log(`%c${emoji} ${char}`, 'font-size: 20px; color: blue;');
            index++;
        }
    }


    /**
     * Log a message with a flashing background effect.
     *
     * @param {string} message - The log message to be printed.
     *
     * @returns {void}
     *
     * @example
     * ConsoleColorLogger.flashBackground('This message has a flashing background effect');
     *
     * @description
     * The `flashBackground` function logs a message with a flashing background effect to the console.
     * It creates a visually striking effect by alternating the background color.
     */
    static flashBackground(message) {
        let isFlash = false;
        for (const char of message) {
            isFlash = !isFlash;
            const backgroundColor = isFlash ? 'yellow' : 'transparent';
            console.log(`%c${char}`, `background-color: ${backgroundColor}; color: black;`);
        }
    }


    /**
    * Log a message with rainbow colors to the console.
    *
    * @param {string} message - The log message to be printed.
    *
    * @returns {void}
    *
    * @example
    * ConsoleColorLogger.logRainbow('This is a colorful message!');
    *
    * @description
    * The `logRainbow` function logs a message to the console with rainbow colors.
    * It creates a visually appealing effect by cycling through different colors for each character in the message.
    */
    static logRainbow(message) {
        const rainbowColors = ['#ff0000', '#ff9900', '#ffff00', '#33cc33', '#3399ff', '#cc33ff'];
        let colorIndex = 0;

        for (const char of message) {
            const color = rainbowColors[colorIndex % rainbowColors.length];
            console.log(`%c${char}`, `color: ${color}`);
            colorIndex++;
        }
    }


    /**
     * Logs all the available functions (static and non-static) in the CustomConsoleLogger class to the console.
     *
     * @return {void}
     *
     * @example
     *  Example usage:
     *  CustomConsoleLogger.logAvailableFunctions();
     *
     * @description
     * This method logs all the available functions (static and non-static) in the AuditLogger class to the console.
     */
    static logAvailableFunctions() {
        const functionNames = Object.getOwnPropertyNames(CustomConsoleLogger).filter(name => typeof CustomConsoleLogger[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');
        const nonStaticFunctionNames = Object.getOwnPropertyNames(CustomConsoleLogger.prototype).filter(name => typeof CustomConsoleLogger.prototype[name] === 'function' && name !== 'constructor');

        console.log("*************************************************");
        console.log(`Available static functions in CustomConsoleLogger class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
        console.log("*************************************************");
        console.log("");
        console.log(`\nAvailable non-static functions in CustomConsoleLogger class:`);
        nonStaticFunctionNames.forEach(name => console.log(`- ${name}()`));
    }
}

export { CustomConsoleLogger };
