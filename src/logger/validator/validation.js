
import Joi from "joi";


/**
 * Validation utility for logger classes.
 */
class LoggerValidation {

    _validateFileName = (params) => {
        const schema = Joi.object({
            fileName: Joi.string().required(),
        });

        const { error } = schema.validate(params);

        if (error) {
            throw new Error(`Invalid parameters: ${error.details[0].message}`);
        }
    }


    /**
   * Validates log file name.
   * 
   * @param {object} params - Object containing file name
   * @param {string} params.fileName - File name to validate
   * @throws {Error} If file name is invalid
   * @private
   */
    _validateLogLevel = (params) => {
        const validReturnTypes = ['WARN', 'INFO', 'DEBUG'];
        const schema = Joi.object({
            level: Joi.string().valid(...validReturnTypes).default("INFO"),
        });

        const { error } = schema.validate(params);
        if (error) {
            throw new Error(`Invalid parameters: ${error.details[0].message}`);
        }
    }


    /**
     * Validates log level.
     * 
     * @param {object} params - Object containing log level 
     * @param {string} params.level - Log level to validate
     * @throws {Error} If log level is invalid
     * @private  
     */
    _validateLogMessage = (params) => {
        const schema = Joi.object({
            message: Joi.string().required(),
        });
        const { error } = schema.validate(params);
        if (error) {
            throw new Error(`Invalid parameters: ${error.details[0].message}`);
        }
    }


    /**
     * Validates event and payload for emitting custom events.
     * 
     * @param {object} params - Object containing event and payload
     * @param {string} params.event - Event name to validate
     * @param {*} params.payload - Payload to validate
     * @throws {Error} If event or payload is invalid
     * @private  
     */
    _validateEmit(params) {
        const schema = Joi.object({
            event: Joi.string().required(),
            payload: Joi.any(),
        });

        const { error } = schema.validate(params);
        if (error) {
            throw new Error(`Invalid parameters for emit: ${error.details[0].message}`);
        }
    }

    /**
   * Validates event and listener for event listeners.
   *
   * @param {object} params - Object containing event and listener
   * @param {string} params.event - Event name to validate
   * @param {Function} params.listener - Listener to validate
   * @throws {Error} If event or listener is invalid
   * @private
   */
    _validateEmittion(params) {
        const schema = Joi.object({
            event: Joi.string().required(),
            listener: Joi.func(),
        });

        const { error } = schema.validate(params);
        if (error) {
            throw new Error(`Invalid parameters for on: ${error.details[0].message}`);
        }
    }

}

export { LoggerValidation }