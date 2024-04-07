/**
 * -----------------------------------------------
 * Parameter Validator Class
 * --------------------------------------------
 * Handles input validation forHandler methods
 */

import Joi from "joi";

class DomValidator {

    /**
     * Validates parameters against a given Joi schema.
     * @param {Object} schema - The Joi schema to validate against.
     * @param {Object} params - The parameters to validate.
     * @param {boolean} throwOnError - Whether to throw an error if validation fails. Default is true.
     * @returns {boolean} True if validation passes.
     * @throws {Error} If validation fails and throwOnError is true.
     */

    static validateParams = (schema, params, throwOnError = true) => {
        const {
            error
        } = schema.validate(params);

        if (error) {
            if (throwOnError) {
                throw new Error(`Invalid parameters: ${error.details[0].message}`);
            } else {
                return false;
            }
        }

        return true;
    }



    static isString = (params) => {
        const schema = Joi.object({
            param: Joi.string().required(),
            throwOnError: Joi.boolean().required()
        })

        return this.validateParams(schema, params, params.throwOnError);
    }


    static isObject = (params) => {
        const schema = Joi.object({
            param: Joi.object().required(),
            throwOnError: Joi.boolean().required()
        })

        return this.validateParams(schema, params, params.throwOnError);
    }


    static isNumber = (params) => {
        const schema = Joi.object({
            param: Joi.number().required(),
            throwOnError: Joi.boolean().required()
        })

        return this.validateParams(schema, params, params.throwOnError);

    }


    static isBoolean = (params) => {
        const schema = Joi.object({
            param: Joi.boolean().required(),
            throwOnError: Joi.boolean().required()
        })

        return this.validateParams(schema, params, params.throwOnError);

    }


    static existInArray = (params, array, def) => {

        const schema = Joi.object({
            param: Joi.string().valid(...array).default(def),
            throwOnError: Joi.boolean().required()
        })

        return this.validateParams(schema, params, params.throwOnError);
    }

    static isArray = (params) => {
        const schema = Joi.object({
            param: Joi.array().required(),
            throwOnError: Joi.boolean().required()
        })

        return this.validateParams(schema, params, params.throwOnError);
    }

    static isFunction = (params) => {
        const schema = Joi.object({
            param: Joi.func().required(),
            throwOnError: Joi.boolean().required()
        })
        return this.validateParams(schema, params, params.throwOnError);
    }


    static isStringOrNull(params) {
        const schema = Joi.object({
            param: Joi.string().allow(null).required(),
            throwOnError: Joi.boolean().required()
        })

        return this.validateParams(schema, params, params.throwOnError);
    }


    static isObjectOrNull(params) {
        const schema = Joi.object({
            param: Joi.object().allow(null).required(),
            throwOnError: Joi.boolean().required()
        });

        return this.validateParams(schema, params, params.throwOnError);
    }


    static isArrayOfObjects(params) {
        const schema = Joi.object({
            param: Joi.array().items(Joi.object()).required(),
            throwOnError: Joi.boolean().required()
        });
        return this.validateParams(schema, params, params.throwOnError);
    }



    static throwOrReturnOnError = (throwOnError, message) => {
        if (throwOnError) {
            throw new Error(message);
        } else {
            return null;
        }
    }

}

export { DomValidator };