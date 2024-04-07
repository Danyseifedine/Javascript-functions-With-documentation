import { DomValidator as GET_ELEMENT_VALIDATION } from "../validation/validation.js";
import CryptoJS from 'crypto-js';
import LZString from 'lz-string';


/**
 * A utility class for managing browser storage.
 *
 * @class StorageManager
 */
class StorageManager {

    /**
     * Sets a value in either sessionStorage or localStorage based on the provided parameters.
     *
     * @param {string} key - The key under which to store the value.
     * @param {*} value - The value to be stored (can be any JSON-serializable data).
     * @param {boolean} [useSessionStorage=false] - If true, stores the value in sessionStorage; otherwise, stores it in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns without storing the value.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     * // Example usage:
     * // StorageManager.setValue('username', 'john_doe');
     *
     * @description
     * This method sets a value in either sessionStorage or localStorage based on the provided parameters.
     * Throws an error if the 'key' parameter is not a string.
     */
    static setValue(key, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }
        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.setItem(key, JSON.stringify(value));
        return this;
    }


    /**
     * Gets a value from either sessionStorage or localStorage based on the provided parameters.
     *
     * @param {string} key - The key under which the value is stored.
     * @param {boolean} [useSessionStorage=false] - If true, retrieves the value from sessionStorage; otherwise, retrieves it from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {*} - The retrieved value, or null if the value is not found or an error occurs.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     * // Example usage:
     * // const storedUsername = StorageManager.getValue('username');
     *
     * @description
     * This method gets a value from either sessionStorage or localStorage based on the provided parameters.
     * Returns the retrieved value, or null if the value is not found or an error occurs.
     * Throws an error if the 'key' parameter is not a string.
     */
    static getValue(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }
        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        return storedValue ? JSON.parse(storedValue) : null;
    }


    /**
     * Removes a stored value by key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the value to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void|null} - Returns null if the key is not found, or void if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     *  Example usage:
     *  StorageManager.removeValue('myKey', true);
     *
     * @description
     * This method removes a stored value by key from either sessionStorage or localStorage.
     * Returns null if the key is not found, or void if successful.
     * Throws an error if the 'key' parameter is not a string.
     */
    static removeValue(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.removeItem(key);
        return this;
    }


    /**
     * Clears all stored values from either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, clears sessionStorage; otherwise, clears localStorage.
     *
     * @return {void}
     *
     * @example
     *  Example usage:
     *  StorageManager.clearStorage(true);
     *
     * @description
     * This method clears all stored values from either sessionStorage or localStorage.
     */
    static clearStorage(useSessionStorage = false) {
        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.clear();
    }


    /**
     * Stores an object with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key under which the object will be stored.
     * @param {Object} value - The object to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void|null} - Returns null if the key or value is invalid, or void if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     *  Example usage:
     *  StorageManager.setObject('myObject', { name: 'John', age: 30 }, true);
     *
     * @description
     * This method stores an object with the specified key in either sessionStorage or localStorage.
     * Returns null if the key or value is invalid, or void if successful.
     * Throws an error if the 'key' parameter is not a string.
     */
    static setObject(key, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })
            || !GET_ELEMENT_VALIDATION.isObject({ param: value, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const serializedValue = JSON.stringify(value);
        storage.setItem(key, serializedValue);
        return this;
    }


    /**
     * Retrieves an object value with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the object to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or invalid JSON format;
     * otherwise, returns null.
     *
     * @return {Object|null} - Returns null if the key or stored value is invalid, or the retrieved object if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string,
     * or if the stored value is not an object (excluding arrays) or has invalid JSON format.
     *
     * @example
     *  Example usage:
     *  const myObject = StorageManager.getObject('myObject', true);
     *
     * @description
     * This method retrieves an object value with the specified key from either sessionStorage or localStorage.
     * Returns null if the key or stored value is invalid, or the retrieved object if successful.
     * Throws an error if the 'key' parameter is not a string,
     * or if the stored value is not an object (excluding arrays) or has invalid JSON format.
     */
    static getObject(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            const parsedValue = JSON.parse(storedValue);
            if (parsedValue !== null && typeof parsedValue === 'object' && !Array.isArray(parsedValue)) {
                return parsedValue;
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be a non-array object.');
                return null;
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be an object.');
            return null;
        }
    }


    /**
     * Updates an object stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key under which the object is stored.
     * @param {Object} newValue - The new value to be added or updated within the stored object.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void|null} - Returns null if the key is invalid, or void if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not an object.
     *
     * @example
     *  Example usage:
     *  StorageManager.addToObject('myObject', { "lastName": "Doe" }, true);
     *
     * @description
     * This method updates an object stored with the specified key in either sessionStorage or localStorage.
     * Returns null if the key is invalid, or void if successful.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not an object.
     */
    static addToObject(key, newValue, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isObject({ param: newValue, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = JSON.parse(storage.getItem(key)) || {};

        if (typeof storedValue !== 'object') {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be an object');
            return;
        }

        const updatedValue = { ...storedValue, ...newValue };
        storage.setItem(key, JSON.stringify(updatedValue));
        return this;
    }


    /**
     * Retrieves a value from an object stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the stored object.
     * @param {string} propertyName - The property name of the value to retrieve from the stored object.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {any|null} - Returns null if the key or property name is not found, or the retrieved value otherwise.
     *
     * @throws {Error} - Throws an error if the 'key' or 'propertyName' parameters are not strings.
     *
     * @example
     *  Example usage:
     *  const lastName = StorageManager.getFromObject('myObject', 'lastName', true);
     *
     * @description
     * This method retrieves a value from an object stored with the specified key in either sessionStorage or localStorage.
     * Returns null if the key or property name is not found, or the retrieved value otherwise.
     * Throws an error if the 'key' or 'propertyName' parameters are not strings.
     */
    static getFromObject(key, propertyName, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: propertyName, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" and "propertyName" must be strings.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = JSON.parse(storage.getItem(key));

        return storedValue && storedValue.hasOwnProperty(propertyName) ? storedValue[propertyName] : null;
    }


    /**
     * Updates a specific element within an object stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key under which the object is stored.
     * @param {string} propertyName - The property name of the element to be updated.
     * @param {any} newValue - The new value to replace the existing value of the specified element.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void|null} - Returns null if the key, propertyName, or stored value is invalid, or void if successful.
     *
     * @throws {Error} - Throws an error if the 'key' or 'propertyName' parameters are not strings,
     * or if the stored value is not an object.
     *
     * @example
     *  Example usage:
     *  StorageManager.updateInObject('myObject', 'lastName', 'Doe', true);
     *
     * @description
     * This method updates a specific element within an object stored with the specified key in either sessionStorage or localStorage.
     * Returns null if the key, propertyName, or stored value is invalid, or void if successful.
     * Throws an error if the 'key' or 'propertyName' parameters are not strings,
     * or if the stored value is not an object.
     */
    static updateInObject(key, propertyName, newValue, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: propertyName, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" and "propertyName" must be strings.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = JSON.parse(storage.getItem(key)) || {};

        if (typeof storedValue !== 'object') {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be an object');
            return;
        }

        storedValue[propertyName] = newValue;
        storage.setItem(key, JSON.stringify(storedValue));
        return this;
    }


    /**
     * Removes a specific element from an object stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key under which the object is stored.
     * @param {string} propertyName - The property name of the element to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void|null} - Returns null if the key, propertyName, or stored value is invalid, or void if successful.
     *
     * @throws {Error} - Throws an error if the 'key' or 'propertyName' parameters are not strings,
     * or if the stored value is not an object.
     *
     * @example
     *  Example usage:
     *  StorageManager.removeFromObject('myObject', 'lastName', true);
     *
     * @description
     * This method removes a specific element from an object stored with the specified key in either sessionStorage or localStorage.
     * Returns null if the key, propertyName, or stored value is invalid, or void if successful.
     * Throws an error if the 'key' or 'propertyName' parameters are not strings,
     * or if the stored value is not an object.
     */
    static removeFromObject(key, propertyName, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: propertyName, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" and "propertyName" must be strings.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = JSON.parse(storage.getItem(key)) || {};

        if (typeof storedValue !== 'object') {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be an object');
            return;
        }

        delete storedValue[propertyName];
        storage.setItem(key, JSON.stringify(storedValue));
    }


    /**
     * Removes the entire object stored with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the object to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void|null} - Returns null if the key or stored value is invalid, or void if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not an object.
     *
     * @example
     *  Example usage:
     *  StorageManager.deleteObject('myObject', true);
     *
     * @description
     * This method removes the entire object stored with the specified key from either sessionStorage or localStorage.
     * Returns null if the key or stored value is invalid, or void if successful.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not an object.
     */
    static deleteObject(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.removeItem(key);
    }


    /**
     * Removes all session or storage items containing objects.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes items from sessionStorage; otherwise, removes items from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if an error occurs while removing items.
     *
     * @example
     * Example usage:
     * StorageManager.removeAllObjectItems(true);
     *
     * @description
     * This method removes all session or storage items containing objects.
     * Throws an error if an error occurs while removing items.
     */
    static removeAllObjectItems(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        Object.keys(storage).forEach(key => {
            const storedValue = storage.getItem(key);

            try {
                const parsedValue = JSON.parse(storedValue);
                if (parsedValue !== null && typeof parsedValue === 'object' && !Array.isArray(parsedValue)) {
                    storage.removeItem(key);
                }
            } catch (error) {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing item with key '${key}': ${error.message}`);
            }
        });
    }


    /**
     * Sets an array value with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key under which the array is stored.
     * @param {Array} value - The array to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void|null} - Returns null if the key or value is invalid, or void if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the value is not an array.
     *
     * @example
     *  Example usage:
     *  StorageManager.setArray('myArray', [1, 2, 3], true);
     *
     * @description
     * This method sets an array value with the specified key in either sessionStorage or localStorage.
     * Returns null if the key or value is invalid, or void if successful.
     * Throws an error if the 'key' parameter is not a string or if the value is not an array.
     */
    static setArray(key, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isArray({ param: value, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string, and "value" must be an array.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.setItem(key, JSON.stringify(value));
        return this;

    }


    /**
     * Retrieves an array value with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the array to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not an array;
     *                                       otherwise, returns null.
     *
     * @return {Array|null} - Returns null if the key or stored value is invalid, or the retrieved array if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not an array.
     *
     * @example
     * // Example usage:
     * // const myArray = StorageManager.getArray('myArray', true);
     *
     * @description
     * This method retrieves an array value with the specified key from either sessionStorage or localStorage.
     * Returns null if the key or stored value is invalid, or the retrieved array if successful.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not an array.
     */
    static getArray(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = JSON.parse(storage.getItem(key));

        if (!Array.isArray(storedValue)) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be an array.');
            return null;
        }

        return storedValue;
    }


    /**
      * Adds an element to an array stored with the specified key in either sessionStorage or localStorage.
      *
      * @param {string} key - The key of the array to which the element will be added.
      * @param {any} element - The element to be added to the array.
      * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
      * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
      *
      * @return {void}
      *
      * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not an array.
      *
      * @example
      *  Example usage:
      *  StorageManager.addToArray('myArray', 'newElement', true);
      *
      * @description
      * This method adds an element to an array stored with the specified key in either sessionStorage or localStorage.
      * Throws an error if the 'key' parameter is not a string or if the stored value is not an array.
      */
    static addToArray(key, element, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (!Array.isArray(JSON.parse(storedValue))) {
            throw new Error(`Invalid stored value for key '${key}': Expected an array.`);
        }

        const arrayValue = JSON.parse(storedValue) || [];
        arrayValue.push(element);

        storage.setItem(key, JSON.stringify(arrayValue));
        return this;

    }

    /**
     * Updates an element in an array stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the array in which the element will be updated.
     * @param {any} oldElement - The element to be updated.
     * @param {any} newElement - The new value to replace the old element.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not an array.
     *
     * @example
     *  Example usage:
     *  StorageManager.updateInArray('myArray', 'oldValue', 'newValue', true);
     *
     * @description
     * This method updates an element in an array stored with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not an array.
     */
    static updateInArray(key, oldElement, newElement, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (!Array.isArray(JSON.parse(storedValue))) {
            throw new Error(`Invalid stored value for key '${key}': Expected an array.`);
        }

        const arrayValue = JSON.parse(storedValue) || [];
        const index = arrayValue.indexOf(oldElement);

        if (index !== -1) {
            arrayValue[index] = newElement;
            storage.setItem(key, JSON.stringify(arrayValue));
        }
        return this;
    }


    /**
     * Removes an element from an array stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the array from which the element will be removed.
     * @param {any} element - The element to be removed from the array.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not an array.
     *
     * @example
     *  Example usage:
     *  StorageManager.removeElementFromArray('myArray', 'valueToRemove', true);
     *
     * @description
     * This method removes an element from an array stored with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not an array.
     */
    static removeFromArray(key, element, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (!Array.isArray(JSON.parse(storedValue))) {
            throw new Error(`Invalid stored value for key '${key}': Expected an array.`);
        }

        const arrayValue = JSON.parse(storedValue) || [];
        const index = arrayValue.indexOf(element);

        if (index !== -1) {
            arrayValue.splice(index, 1);
            storage.setItem(key, JSON.stringify(arrayValue));
        }
        return this;
    }


    /**
     * Retrieves an element at the specified index from an array stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the array from which to retrieve the element.
     * @param {number} index - The index of the element to retrieve.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {*} - Returns the element at the specified index if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string,
     * if the stored value is not an array, or if the index is out of bounds.
     *
     * @example
     *  Example usage:
     *  const element = StorageManager.getFromArray('myArray', 0, true);
     *
     * @description
     * This method retrieves an element at the specified index from an array stored with the specified key in either sessionStorage or localStorage.
     * Returns the element at the specified index if successful, or null if an error occurs.
     * Throws an error if the 'key' parameter is not a string, if the stored value is not an array, or if the index is out of bounds.
     */
    static getFromArray(key, index, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: index, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = JSON.parse(storage.getItem(key));

        if (!Array.isArray(storedValue)) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be an array.');
            return null;
        }

        if (index < 0 || index >= storedValue.length) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Index out of bounds.');
            return null;
        }

        return storedValue[index];
    }


    /**
     * Adds an element at the specified index in an array stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the array to which the element will be added.
     * @param {*} element - The element to add to the array.
     * @param {number} index - The index at which to add the element.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string,
     * if the stored value is not an array, or if the index is out of bounds.
     *
     * @example
     *  Example usage:
     *  StorageManager.addToArrayByIndex('myArray', 'newElement', 1, true);
     *
     * @description
     * This method adds an element at the specified index in an array stored with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string, if the stored value is not an array, or if the index is out of bounds.
     */
    static addToArrayByIndex(key, element, index, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: index, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (!Array.isArray(JSON.parse(storedValue))) {
            throw new Error(`Invalid stored value for key '${key}': Expected an array.`);
        }

        const arrayValue = JSON.parse(storedValue) || [];

        if (index < 0 || index > arrayValue.length) {
            throw new Error(`Index out of bounds for key '${key}'.`);
        }

        arrayValue.splice(index, 0, element);
        storage.setItem(key, JSON.stringify(arrayValue));
        return this;
    }


    /**
     * Removes an entire array stored with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the array to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     *  Example usage:
     *  StorageManager.removeArray('myArray', true);
     *
     * @description
     * This method removes an entire array stored with the specified key from either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string.
     */
    static removeArray(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.removeItem(key);
    }


    /**
     * Removes all session or storage items containing arrays.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes items from sessionStorage; otherwise, removes items from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if an error occurs while removing items.
     *
     * @example
     * Example usage:
     * StorageManager.removeAllArrayItems(true);
     *
     * @description
     * This method removes all session or storage items containing arrays.
     * Throws an error if an error occurs while removing items.
     */
    static removeAllArrayItems(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        Object.keys(storage).forEach(key => {
            const storedValue = storage.getItem(key);

            try {
                const parsedValue = JSON.parse(storedValue);
                if (Array.isArray(parsedValue)) {
                    storage.removeItem(key);
                }
            } catch (error) {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing item with key '${key}': ${error.message}`);
            }
        });
    }


    /**
     * Sets a numeric value in either sessionStorage or localStorage, but only if the key does not exist.
     *
     * @param {string} key - The key to identify the stored value.
     * @param {number} value - The value to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, stores the value in sessionStorage; otherwise, stores the value in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not valid JSON.
     *
     * @example
     * Example usage:
     * js.StorageManager.setNumber('myCounter', 10, true);
     */
    static setNumber(key, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        // Check if the key already exists
        if (storage.getItem(key) === null) {
            storage.setItem(key, JSON.stringify(value));
            return this;
        }
    }


    /**
     * Retrieves a numeric value with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the numeric value to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {number|null} - Returns null if the key or stored value is invalid, or the retrieved numeric value if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a number.
     *
     * @example
     *  Example usage:
     *  const myNumber = StorageManager.getNumber('myNumber', true);
     *
     * @description
     * This method retrieves a numeric value with the specified key from either sessionStorage or localStorage.
     * Returns the numeric value if successful, or null if an error occurs.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a number.
     */
    static getNumber(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = JSON.parse(storage.getItem(key));

        if (typeof storedValue !== 'number') {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be a number.');
            return null;
        }

        return storedValue;
    }


    /**
     * Updates a numeric value with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key for updating the numeric value.
     * @param {number} newValue - The new numeric value to be set.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a number.
     *
     * @example
     *  Example usage:
     *  StorageManager.updateNumber('myNumber', 42);
     *
     * @description
     * This method updates a numeric value with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a number.
     */
    static updateNumber(key, newValue, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (!GET_ELEMENT_VALIDATION.isNumber({ param: storedValue, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be a number.');
            return;
        }

        storage.setItem(key, JSON.stringify(Number(newValue)));
        return this;
    }


    /**
     * Removes all session or storage items with numeric values.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes items from sessionStorage; otherwise, removes items from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if an error occurs while removing items.
     *
     * @example
     * Example usage:
     * StorageManager.removeNumericValues(true);
     *
     * @description
     * This method removes all session or storage items with numeric values.
     * Throws an error if an error occurs while removing items.
     */
    static removeNumericValues(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        Object.keys(storage).forEach(key => {
            const storedValue = storage.getItem(key);

            if (!isNaN(storedValue)) {
                try {
                    storage.removeItem(key);
                } catch (error) {
                    GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing item with key '${key}': ${error.message}`);
                }
            }
        });
    }


    /**
     * Sets a boolean value for the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key for the boolean value.
     * @param {boolean} value - The boolean value to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     * Example usage:
     * StorageManager.setBoolean('myBoolean', true, true);
     *
     * @description
     * This method sets a boolean value for the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string.
     */
    static setBoolean(key, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })
            || !GET_ELEMENT_VALIDATION.isBoolean({ param: value, throwOnError })) {
            {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
                return;
            }
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.setItem(key, JSON.stringify(!!value));
        return this;
    }


    /**
     * Retrieves a boolean value with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the boolean value to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {boolean|null} - Returns null if the key or stored value is invalid, or the retrieved boolean value if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a boolean.
     *
     * @example
     * Example usage:
     * const myBoolean = StorageManager.getBoolean('myBoolean', true);
     *
     * @description
     * This method retrieves a boolean value with the specified key from either sessionStorage or localStorage.
     * Returns null if the key or stored value is invalid, or the retrieved boolean value if successful.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a boolean.
     */
    static getBoolean(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = JSON.parse(storage.getItem(key));

        if (typeof storedValue !== 'boolean' && storedValue !== null) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be a boolean.');
            return null;
        }

        return storedValue;
    }


    /**
     * Updates a boolean value for the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key for the boolean value.
     * @param {boolean} value - The new boolean value to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a boolean.
     *
     * @example
     * Example usage:
     * StorageManager.updateBoolean('myBoolean', false, true);
     *
     * @description
     * This method updates a boolean value for the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a boolean.
     */
    static updateBoolean(key, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (typeof JSON.parse(storedValue) !== 'boolean' && storedValue !== null) {
            throw new Error(`Invalid stored value for key '${key}': Expected a boolean.`);
        }

        storage.setItem(key, JSON.stringify(value));
        return this;
    }


    /**
     * Removes all session or storage items with boolean values.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes items from sessionStorage; otherwise, removes items from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if an error occurs while removing items.
     *
     * @example
     * Example usage:
     * StorageManager.removeAllBooleanItems(true);
     *
     * @description
     * This method removes all session or storage items with boolean values.
     * Throws an error if an error occurs while removing items.
     */
    static removeAllBooleanItems(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        Object.keys(storage).forEach(key => {
            const storedValue = storage.getItem(key);

            try {
                if (typeof JSON.parse(storedValue) === 'boolean') {
                    storage.removeItem(key);
                }
            } catch (error) {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing item with key '${key}': ${error.message}`);
            }
        });
    }


    /**
     * Removes a boolean value stored in either sessionStorage or localStorage with the specified key.
     *
     * @param {string} key - The key of the boolean value to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the item from sessionStorage; otherwise, removes it from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if an error occurs while removing the boolean value.
     *
     * @example
     * // Example usage:
     * // StorageManager.removeBoolean('myBool', true);
     *
     * @description
     * This method removes a boolean value stored in either sessionStorage or localStorage with the specified key.
     * Throws an error if an error occurs while removing the boolean value.
     */
    static removeBoolean(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            storage.removeItem(key);
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing boolean item with key '${key}': ${error.message}`);
        }
    }


    /**
 * Stores a string value with the specified key in either sessionStorage or localStorage.
 *
 * @param {string} key - The key under which to store the string value.
 * @param {string} value - The string value to be stored.
 * @param {boolean} [useSessionStorage=false] - If true, stores the item in sessionStorage; otherwise, stores it in localStorage.
 * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
 *
 * @return {void}
 *
 * @throws {Error} - Throws an error if the 'key' parameter is not a string.
 *
 * @example
 * // Example usage:
 * // StorageManager.setString('myString', 'Hello, World!', true);
 *
 * @description
 * This method stores a string value with the specified key in either sessionStorage or localStorage.
 * Throws an error if the 'key' parameter is not a string.
 */
    static setString(key, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: value, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.setItem(key, value);
        return this;
    }


    /**
     * Retrieves a string value stored in either sessionStorage or localStorage with the specified key.
     *
     * @param {string} key - The key of the string value to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, retrieves the item from sessionStorage; otherwise, retrieves it from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {string|null} - Returns null if the key or stored value is invalid, or the retrieved string if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     * // Example usage:
     * // const myString = StorageManager.getString('myString', true);
     */
    static getString(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        return storedValue;

    }


    /**
     * Updates a string value stored in either sessionStorage or localStorage with the specified key.
     *
     * @param {string} key - The key of the string value to be updated.
     * @param {string} value - The new string value to be set.
     * @param {boolean} [useSessionStorage=false] - If true, updates the item in sessionStorage; otherwise, updates it in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     * // Example usage:
     * // StorageManager.updateString('myString', 'New Value', true);
     */
    static updateString(key, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (storedValue !== null) {
            storage.setItem(key, value);
        }
        return this;
    }


    /**
     * Removes a string value stored in either sessionStorage or localStorage with the specified key.
     *
     * @param {string} key - The key of the string value to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the item from sessionStorage; otherwise, removes it from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     * // Example usage:
     * // StorageManager.removeString('myString', true);
     */
    static removeString(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (storedValue !== null) {
            storage.removeItem(key);
        }
    }


    /**
     * Removes all session or storage items with string values.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes items from sessionStorage; otherwise, removes items from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if an error occurs while removing items.
     *
     * @example
     * // Example usage:
     * // StorageManager.removeAllStringItems(true);
     */
    static removeAllStringItems(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        Object.keys(storage).forEach(key => {
            const storedValue = storage.getItem(key);

            try {
                JSON.parse(storedValue);
            } catch (error) {
                storage.removeItem(key);
            }
        });
    }


    /**
     * Sets an expiration time for a value in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored value.
     * @param {*} value - The value to be stored.
     * @param {number} secondsToExpiration - The number of seconds until the value expires.
     * @param {boolean} [useSessionStorage=false] - If true, stores the value in sessionStorage; otherwise, stores the value in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not valid JSON.
     *
     * @example
     * Example usage:
     * StorageManager.setExpiration("exampleKey", { data: "example" }, 10, true);
     */
    static setExpiration(key, value, secondsToExpiration, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })
            || !GET_ELEMENT_VALIDATION.isNumber({ param: secondsToExpiration, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const expirationTime = secondsToExpiration ? Date.now() + secondsToExpiration * 1000 : null;
        const storedValue = { value, expirationTime };

        try {
            storage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error storing value for key '${key}': ${error.message}`);
        }

        if (expirationTime) {
            setTimeout(() => {
                storage.removeItem(key);
                console.log(`Value for key '${key}' has expired and been removed.`);
            }, secondsToExpiration * 1000);
        }
        return this;
    }


    /**
 * Retrieves a value with an expiration time from either sessionStorage or localStorage.
 *
 * @param {string} key - The key to identify the stored value.
 * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
 * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
 *
 * @return {Object|null} - Returns null if the key or stored value is invalid, or the retrieved value with expiration details if successful.
 *
 * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not valid JSON.
 *
 * @example
 * Example usage:
 * const storedData = StorageManager.getExpiration("exampleKey", true);
 * console.log(storedData);
 *
 * @description
 * This method retrieves a value with an expiration time from either sessionStorage or localStorage.
 * Returns null if the key or stored value is invalid, or the retrieved value with expiration details if successful.
 * Throws an error if the 'key' parameter is not a string or if the stored value is not valid JSON.
 */
    static getExpiration(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            const parsedValue = JSON.parse(storedValue);

            if (!parsedValue || typeof parsedValue !== 'object') {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be an object.');
                return null;
            }

            const { value, expirationTime } = parsedValue;
            const now = Date.now();
            const remainingTime = Math.max(0, expirationTime - now);
            const countdown = new Date(remainingTime).toISOString().substr(11, 8);

            return {
                value,
                expirationTime,
                remainingTime,
                countdown
            };
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Invalid JSON format in stored value for key '${key}': ${error.message}`);
            return null;
        }
    }


    /**
     * Checks if a value stored in either sessionStorage or localStorage with the specified key has expired.
     *
     * @param {string} key - The key of the value to check for expiration.
     * @param {boolean} [useSessionStorage=false] - If true, checks for expiration in sessionStorage; otherwise, checks for expiration in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {boolean} - Returns true if the value has expired, false if it is still valid, or null if the key or stored value is invalid.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     * // Example usage:
     * // const isExpired = StorageManager.checkExpiration('myKey', true);
     */
    static checkExpiration(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (storedValue !== null) {
            const item = JSON.parse(storedValue);
            const currentTime = Date.now();

            if (item.expirationTime && currentTime > item.expirationTime) {
                return true; // Value has expired
            }

            return false; // Value is still valid
        }

        return null; // Key or stored value is invalid
    }

    /**
      * Clears all expired values from either sessionStorage or localStorage based on the specified key.
      *
      * @param {string} key - The key to identify the stored value.
      * @param {boolean} [useSessionStorage=false] - If true, clears items from sessionStorage; otherwise, clears items from localStorage.
      * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
      *
      * @return {void}
      *
      * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not valid JSON.
      *
      * @example
      * Example usage:
      * StorageManager.clearExpiredValues("exampleKey", true);
      *
      * @description
      * This method clears all expired values from either sessionStorage or localStorage based on the specified key.
      * Throws an error if the 'key' parameter is not a string or if the stored value is not valid JSON.
      */
    static clearExpiredValues(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            const parsedValue = JSON.parse(storedValue);

            if (!parsedValue || typeof parsedValue !== 'object') {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Stored value must be an object.');
                return;
            }

            const { expirationTime } = parsedValue;
            const now = Date.now();

            if (expirationTime && expirationTime <= now) {
                storage.removeItem(key);
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Invalid JSON format in stored value for key '${key}': ${error.message}`);
        }
    }


    /**
     * Removes all items from sessionStorage or localStorage that have an associated expiration time.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes items from sessionStorage; otherwise, removes items from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if an error occurs while removing items.
     *
     * @example
     * // Example usage:
     * // StorageManager.removeAllTimingItems(true);
     *
     * @description
     * This method removes all items from sessionStorage or localStorage that have an associated expiration time.
     * Throws an error if an error occurs while removing items.
     */
    static removeAllTimingItems(useSessionStorage = false) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        Object.keys(storage).forEach(key => {
            try {
                const storedValue = JSON.parse(storage.getItem(key));

                if (storedValue && typeof storedValue === 'object' && 'expirationTime' in storedValue) {
                    storage.removeItem(key);
                }
            } catch (error) {
            }
        });
    }


    /**
     * Increments the numeric value associated with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the value to be incremented.
     * @param {number} incrementAmount - The amount by which to increment the value.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a number.
     *
     * @example
     * Example usage:
     * js.StorageManager.incrementValue('myCounter', 5, true);
     */
    static incrementValue(key, incrementAmount, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (!GET_ELEMENT_VALIDATION.isNumber({ param: storedValue, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Invalid stored value for key '${key}': Expected a number.`);
            return;
        }

        const newValue = parseFloat(storedValue) + incrementAmount;
        storage.setItem(key, newValue.toString());
        return this;
    }


    /**
     * Decrements the numeric value associated with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored numeric value.
     * @param {number} [amount=1] - The amount to decrement the numeric value. Default is 1.
     * @param {boolean} [useSessionStorage=false] - If true, stores the value in sessionStorage; otherwise, stores the value in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid numeric value.
     *
     * @example
     * Example usage:
     * StorageManager.decrementValue('myCounter', 2, true);
     */
    static decrementValue(key, amount = 1, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            const numericValue = parseInt(storedValue, 10);
            if (!isNaN(numericValue)) {
                storage.setItem(key, (numericValue - amount).toString());
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Invalid numeric value for key '${key}'.`);
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error decrementing value for key '${key}': ${error.message}`);
        }
        return this;
    }


    /**
     * Retrieves all keys from either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, retrieves keys from sessionStorage; otherwise, retrieves keys from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns an empty array.
     *
     * @return {Array} - An array containing all keys.
     *
     * @throws {Error} - Throws an error if an error occurs while retrieving keys.
     *
     * @example
     * Example usage:
     * const allKeys = js.StorageManager.getAllKeys(true);
     * console.log(allKeys); // Output: ['key1', 'key2', ...]
     *
     * @description
     * This method retrieves all keys from either sessionStorage or localStorage.
     * Throws an error if an error occurs while retrieving keys.
     */
    static getAllKeys(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            const keys = Object.keys(storage);
            return keys;
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error retrieving keys: ${error.message}`);
            return [];
        }
    }


    /**
     * Retrieves all values from either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, retrieves values from sessionStorage; otherwise, retrieves values from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns an empty array.
     *
     * @return {Array} - An array containing all values.
     *
     * @throws {Error} - Throws an error if an error occurs while retrieving values.
     *
     * @example
     * Example usage:
     * const allValues = js.StorageManager.getAllValues(true);
     * console.log(allValues); // Output: ['value1', 'value2', ...]
     *
     * @description
     * This method retrieves all values from either sessionStorage or localStorage.
     * Throws an error if an error occurs while retrieving values.
     */
    static getAllValues(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            const values = Object.values(storage);
            return values;
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error retrieving values: ${error.message}`);
            return [];
        }
    }


    /**
     * Retrieves all key-value entries from either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, retrieves entries from sessionStorage; otherwise, retrieves entries from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns an empty array.
     *
     * @return {Array} - An array containing all key-value entries as objects.
     *
     * @throws {Error} - Throws an error if an error occurs while retrieving entries.
     *
     * @example
     * Example usage:
     * const allEntries = js.StorageManager.getAllEntries(true);
     * console.log(allEntries); // Output: [{ key: 'key1', value: 'value1' }, { key: 'key2', value: 'value2' }, ...]
     *
     * @description
     * This method retrieves all key-value entries from either sessionStorage or localStorage.
     * Throws an error if an error occurs while retrieving entries.
     */
    static getAllEntries(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            const entries = Object.entries(storage).map(([key, value]) => ({ key, value }));
            return entries;
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error retrieving entries: ${error.message}`);
            return [];
        }
    }


    /**
     * Retrieves information about the storage, including the total number of stored items and their total size in bytes.
     *
     * @param {boolean} [useSessionStorage=false] - If true, retrieves information from sessionStorage; otherwise, retrieves information from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {Object|null} - An object containing storage information or null if an error occurs.
     *                       The object structure: { totalItems: number, totalSizeBytes: number }
     *
     * @throws {Error} - Throws an error if an error occurs while retrieving storage information.
     *
     * @example
     * Example usage:
     * const storageInfo = js.StorageManager.getStorageInfo(true);
     * console.log(storageInfo); // Output: { totalItems: 3, totalSizeBytes: 256 }
     *
     * @description
     * This method retrieves information about the storage, including the total number of stored items and their total size in bytes.
     * Throws an error if an error occurs while retrieving storage information.
     */
    static getStorageInfo(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            const totalItems = storage.length;
            let totalSizeBytes = 0;

            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                const value = storage.getItem(key);
                totalSizeBytes += key.length + value.length;
            }

            return { totalItems, totalSizeBytes };
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error retrieving storage information: ${error.message}`);
            return null;
        }
    }


    /**
     * Replaces the value of a stored key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the value to be replaced.
     * @param {*} newValue - The new value to replace the existing one.
     * @param {boolean} [useSessionStorage=false] - If true, replaces the value in sessionStorage; otherwise, replaces the value in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not valid JSON.
     *
     * @example
     * Example usage:
     * js.StorageManager.replaceValue('myKey', { data: 'newData' }, true);
     *
     * @description
     * This method replaces the value of a stored key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not valid JSON.
     */
    static replaceValue(key, newValue, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            if (storedValue !== null) {
                storage.setItem(key, JSON.stringify(newValue));
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `No stored value found for key '${key}'.`);
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error replacing value for key '${key}': ${error.message}`);
        }
    }


    /**
     * Swaps the values between two stored keys in either sessionStorage or localStorage.
     *
     * @param {string} key1 - The first key whose value will be swapped.
     * @param {string} key2 - The second key whose value will be swapped.
     * @param {boolean} [useSessionStorage=false] - If true, swaps the values in sessionStorage; otherwise, swaps the values in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if either 'key1' or 'key2' parameters are not strings or if the stored values are not valid JSON.
     *
     * @example
     * Example usage:
     * js.StorageManager.swapValues('firstKey', 'secondKey', true);
     *
     * @description
     * This method swaps the values between two stored keys in either sessionStorage or localStorage.
     * Throws an error if either 'key1' or 'key2' parameters are not strings or if the stored values are not valid JSON.
     */
    static swapValues(key1, key2, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key1, throwOnError }) || !GET_ELEMENT_VALIDATION.isString({ param: key2, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key1" and "key2" must be strings.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const value1 = storage.getItem(key1);
        const value2 = storage.getItem(key2);

        try {
            if (value1 !== null && value2 !== null) {
                storage.setItem(key1, value2);
                storage.setItem(key2, value1);
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `No stored value found for one or both of the keys: '${key1}', '${key2}'.`);
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error swapping values for keys '${key1}' and '${key2}': ${error.message}`);
        }
    }


    /**
     * Sets a Map object with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored Map object.
     * @param {Map} value - The Map object to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, stores the Map object in sessionStorage; otherwise, stores the Map object in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid Map object.
     *
     * @example
     * Example usage:
     * const myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
     * js.StorageManager.setMap('myMap', myMap, true);
     *
     * @description
     * This method sets a Map object with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid Map object.
     */
    static setMap(key, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            storage.setItem(key, JSON.stringify([...value]));
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error storing Map for key '${key}': ${error.message}`);
        }

        return this;
    }


    /**
     * Retrieves a Map object with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the Map object to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {Map|null} - Returns null if the key or stored value is invalid, or the retrieved Map object if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid Map object.
     *
     * @example
     * / Example usage:
     * / const retrievedMap = js.StorageManager.getMap('myMap', true);
     *
     * @description
     * This method retrieves a Map object with the specified key from either sessionStorage or localStorage.
     * Throws an error if the key or stored value is invalid or if the stored value is not a valid Map object.
     */
    static getMap(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            return storedValue ? new Map(JSON.parse(storedValue)) : null;
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid JSON format in stored Map.');
            return null;
        }
    }


    /**
     * Removes a Map object with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the Map object to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the Map object from sessionStorage; otherwise, removes the Map object from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid Map object.
     *
     * @example
     * Example usage:
     * js.StorageManager.removeMap('myMap', true);
     *
     * @description
     * This method removes a Map object with the specified key from either sessionStorage or localStorage.
     * Throws an error if the key parameter is not a string or if the stored value is not a valid Map object.
     */
    static removeMap(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            storage.removeItem(key);
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing Map with key '${key}': ${error.message}`);
        }
    }


    /**
     * Updates the key of an element in a Map object stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} mapKey - The key of the Map object.
     * @param {*} oldKey - The current key of the element to be updated.
     * @param {*} newKey - The new key for the element.
     * @param {boolean} [useSessionStorage=false] - If true, updates the Map object in sessionStorage; otherwise, updates the Map object in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the parameters are invalid or if the stored value is not a valid Map object.
     *
     * @example
     *  Example usage:
     *  StorageManager.updateKeyInMap('myMap', 'oldKey', 'newKey', true);
     *
     * @description
     * This method updates the key of an element in a Map object stored with the specified key.
     * If the provided 'oldKey' is found in the Map, it is replaced with the 'newKey'.
     * If 'oldKey' is not found, an error is thrown.
     */
    static updateKeyInMap(mapKey, oldKey, newKey, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: mapKey, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: oldKey, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: newKey, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const map = this.getMap(mapKey, useSessionStorage, throwOnError);

        if (map) {
            if (map.has(oldKey)) {
                const value = map.get(oldKey);
                map.delete(oldKey);
                map.set(newKey, value);

                this.setMap(mapKey, map, useSessionStorage, throwOnError);
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Element with key '${oldKey}' not found in Map.`);
            }
        }

        return this;
    }


    /**
     * Updates the key of an element in a Map object stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} mapKey - The key of the Map object.
     * @param {*} oldKey - The current key of the element to be updated.
     * @param {*} newKey - The new key for the element.
     * @param {boolean} [useSessionStorage=false] - If true, updates the Map object in sessionStorage; otherwise, updates the Map object in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the parameters are invalid or if the stored value is not a valid Map object.
     *
     * @example
     *  Example usage:
     *  const myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
     *  js.StorageManager.setMap('myMap', myMap, true);
     *  js.StorageManager.updateKeyInMap('myMap', 'key1', 'name', true);
     *
     * @description
     * This method updates the key of an element in a Map object stored with the specified key.
     * If the provided 'oldKey' is found in the Map, it is replaced with the 'newKey'.
     * If 'oldKey' is not found, an error is thrown.
     */
    static updateValueInMap(mapKey, key, newValue, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: mapKey, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const map = this.getMap(mapKey, useSessionStorage, throwOnError);

        if (map) {
            if (map.has(key)) {
                map.set(key, newValue);
                this.setMap(mapKey, map, useSessionStorage, throwOnError);
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Element with key '${key}' not found in Map.`);
            }
        }
        return this;
    }


    /**
     * Removes an element from a Map object stored with the specified key by its key in either sessionStorage or localStorage.
     *
     * @param {string} mapKey - The key of the Map object.
     * @param {*} key - The key of the element to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the element from the Map object in sessionStorage; otherwise, removes the element from the Map object in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the parameters are invalid or if the stored value is not a valid Map object.
     *
     * @example
     * Example usage:
     * js.StorageManager.setMap('myMap', new Map([['key1', 'value1'], ['key2', 'value2']]), true);
     * js.StorageManager.removeElementByKeyInMap('myMap', 'key1', true);
     *
     * @description
     * This method removes an element from a Map object stored with the specified key by its key.
     * Throws an error if the Map object or element with the specified key is not found.
     */
    static removeElementByKeyInMap(mapKey, key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: mapKey, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const map = this.getMap(mapKey, useSessionStorage, throwOnError);

        if (map) {
            if (map.has(key)) {
                map.delete(key);
                this.setMap(mapKey, map, useSessionStorage, throwOnError);
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Element with key '${key}' not found in Map.`);
            }
        }
        return this;
    }


    /**
     * Removes an element from a Map object stored with the specified key by its key in either sessionStorage or localStorage.
     *
     * @param {string} mapKey - The key of the Map object.
     * @param {*} key - The key of the element to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the element from the Map object in sessionStorage; otherwise, removes the element from the Map object in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the parameters are invalid or if the stored value is not a valid Map object.
     *
     * @example
     *  Example usage:
     *  const myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
     *  js.StorageManager.setMap('myMap', myMap, true);
     *  js.StorageManager.removeElementByKeyInMap('myMap', 'key1', true);
     *
     * @description
     * This method removes an element from a Map object stored with the specified key by its key.
     * If the provided 'key' is found in the Map, the element is removed.
     * If 'key' is not found, an error is thrown.
     */
    static removeElementByValueInMap(mapKey, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: mapKey, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const map = this.getMap(mapKey, useSessionStorage, throwOnError);

        if (map) {
            const key = [...map].find(([k, v]) => v === value)?.[0];

            if (key !== undefined) {
                map.delete(key);
                this.setMap(mapKey, map, useSessionStorage, throwOnError);
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Element with value '${value}' not found in Map.`);
            }
        }
        return this;
    }

    /**
     * Adds an element into a Map object stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} mapKey - The key of the Map object.
     * @param {*} key - The key of the element to be added.
     * @param {*} value - The value of the element to be added.
     * @param {boolean} [useSessionStorage=false] - If true, adds the element into the Map object in sessionStorage; otherwise, adds the element into the Map object in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the parameters are invalid or if the stored value is not a valid Map object.
     *
     * @example
     *  Example usage:
     *  const myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
     *  js.StorageManager.setMap('myMap', myMap, true);
     *  js.StorageManager.addIntoMap('myMap', 'key3', 'value3', true);
     *
     * @description
     * This method adds an element into a Map object stored with the specified key.
     * If the provided 'key' does not exist in the Map, the element is added.
     * If 'key' already exists, an error is thrown.
     */
    static addIntoMap(mapKey, key, value, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: mapKey, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }
        const map = this.getMap(mapKey, useSessionStorage, throwOnError);

        if (map) {
            if (!map.has(key)) {
                map.set(key, value);
                this.setMap(mapKey, map, useSessionStorage, throwOnError);
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Element with key '${key}' already exists in Map.`);
            }
        }
        return this;
    }


    /**
     * Empties a Map object stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} mapKey - The key of the Map object.
     * @param {boolean} [useSessionStorage=false] - If true, empties the Map object in sessionStorage; otherwise, empties the Map object in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the parameters are invalid or if the stored value is not a valid Map object.
     *
     * @example
     *  Example usage:
     *  js.StorageManager.setMap('myMap', new Map([['key1', 'value1'], ['key2', 'value2']]), true);
     *  js.StorageManager.emptyMap('myMap', true);
     *
     * @description
     * This method empties a Map object stored with the specified key.
     * If the Map object does not exist, an error is thrown.
     */
    static emptyMap(mapKey, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: mapKey, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const map = this.getMap(mapKey, useSessionStorage, throwOnError);

        if (map) {
            map.clear();
            this.setMap(mapKey, map, useSessionStorage, throwOnError);
        }
    }


    /**
     * Removes all Map objects with their respective keys from either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes Map objects from sessionStorage; otherwise, removes Map objects from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if an error occurs while removing Map objects.
     *
     * @example
     * Example usage:
     * js.StorageManager.removeAllMapItems(true);
     *
     * @description
     * This method removes all Map objects with their respective keys from either sessionStorage or localStorage.
     * Throws an error if an error occurs while removing Map objects.
     */
    static removeAllMapItems(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        Object.keys(storage).forEach(key => {
            try {
                const storedValue = JSON.parse(storage.getItem(key));

                if (storedValue instanceof Map) {
                    storage.removeItem(key);
                }
            } catch (error) {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing Map with key '${key}': ${error.message}`);
            }
        });
    }


    /**
     * Stores a Date object with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored Date object.
     * @param {Date} date - The Date object to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, stores the Date object in sessionStorage; otherwise, stores the Date object in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid Date object.
     *
     * @example
     *  Example usage:
     *  const currentDate = new Date();
     *  js.StorageManager.setDate('myDate', currentDate, true);
     *
     * @description
     * This method stores a Date object with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid Date object.
     */
    static setDate(key, date, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            storage.setItem(key, date.toISOString());
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error storing Date for key '${key}': ${error.message}`);
        }

        return this;
    }


    /**
      * Retrieves a Date object with the specified key from either sessionStorage or localStorage.
      *
      * @param {string} key - The key of the Date object to be retrieved.
      * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
      * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
      *
      * @return {Date|null} - Returns null if the key or stored value is invalid, or the retrieved Date object if successful.
      *
      * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid Date object.
      *
      * @example
      *  Example usage:
      *  const retrievedDate = js.StorageManager.getDate('myDate', true);
      *
      * @description
      * This method retrieves a Date object with the specified key from either sessionStorage or localStorage.
      * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid Date object.
      */
    static getDate(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            return storedValue ? new Date(storedValue) : null;
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid Date format in stored value.');
            return null;
        }
    }


    /**
     * Removes a Date object with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the Date object to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the Date object from sessionStorage; otherwise, removes the Date object from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid Date object.
     *
     * @example
     *  Example usage:
     *  js.StorageManager.removeDate('myDate', true);
     *
     * @description
     * This method removes a Date object with the specified key from either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid Date object.
     */
    static removeDate(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            storage.removeItem(key);
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing Date with key '${key}': ${error.message}`);
        }

        return this;
    }


    /**
     * Removes all Date objects with their respective keys from either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes Date objects from sessionStorage; otherwise, removes Date objects from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if an error occurs while removing Date objects.
     *
     * @example
     *  Example usage:
     *  js.StorageManager.removeAllDateItems(true);
     *
     * @description
     * This method removes all Date objects with their respective keys from either sessionStorage or localStorage.
     * Throws an error if an error occurs while removing Date objects.
     */
    static removeAllDateItems(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        Object.keys(storage).forEach(key => {
            try {
                const storedValue = JSON.parse(storage.getItem(key));

                if (storedValue instanceof Date) {
                    storage.removeItem(key);
                }
            } catch (error) {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing Date with key '${key}': ${error.message}`);
            }
        });
    }


    /**
     * Stores a function with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored function.
     * @param {Function} func - The function to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, stores the function in sessionStorage; otherwise, stores the function in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string, or if the stored value is not a valid function, or if 'func' is not a function.
     *
     * @example
     *  Example usage:
     *  const myFunction = () => console.log("Hello, World!");
     *  js.StorageManager.setFunction('myFunction', myFunction, true);
     *
     * @description
     * This method stores a function with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string, or if the stored value is not a valid function, or if 'func' is not a function.
     */
    static setFunction(key, func, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError }) || !GET_ELEMENT_VALIDATION.isFunction({ param: func, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string and "func" must be a function.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            storage.setItem(key, func.toString());
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error storing function for key '${key}': ${error.message}`);
        }

        return this;
    }


    /**
     * Retrieves a function with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the function to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {Function|null} - Returns null if the key or stored value is invalid, or the retrieved function if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string, or if the stored value is not a valid function.
     *
     * @example
     *  Example usage:
     *  const retrievedFunction = js.StorageManager.getFunction('myFunction', true);
     */
    static getFunction(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            return storedValue ? new Function(`return ${storedValue}`)() : null;
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid function format in stored value.');
            return null;
        }
    }


    /**
     * Removes a function with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the function to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the function from sessionStorage; otherwise, removes the function from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string, or if the stored value is not a valid function.
     *
     * @example
     *  Example usage:
     *  js.StorageManager.removeFunction('myFunction', true);
     */
    static removeFunction(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.removeItem(key);

    }


    /**
     * Stores a RegExp object with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored RegExp object.
     * @param {RegExp} regExp - The RegExp object to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, stores the RegExp object in sessionStorage; otherwise, stores the RegExp object in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the value is not a RegExp object; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the value is not a RegExp object.
     *
     * @example
     *  Example usage:
     *  const myRegExp = new RegExp('pattern');
     *  js.StorageManager.setRegExp('myKey', myRegExp, true);
     *
     * @description
     * This method stores a RegExp object with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the value is not a RegExp object.
     */
    static setRegExp(key, regExp, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        if (!(regExp instanceof RegExp)) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameter: "regExp" must be a RegExp object.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            storage.setItem(key, regExp.toString());
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error storing RegExp for key '${key}': ${error.message}`);
        }
    }


    /**
     * Retrieves a RegExp object with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the RegExp object to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not a valid RegExp object; otherwise, returns null.
     *
     * @return {RegExp|null} - Returns null if the key or stored value is invalid or if the stored value is not a valid RegExp object, or the retrieved RegExp object if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid RegExp object.
     *
     * @example
     *  Example usage:
     *  const retrievedRegExp = js.StorageManager.getRegExp('myRegExp', true);
     *
     * @description
     * This method retrieves a RegExp object with the specified key from either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid RegExp object.
     */
    static getRegExp(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            const regex = new RegExp(storedValue);

            if (Object.prototype.toString.call(regex) === '[object RegExp]') {
                return regex;
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid RegExp format in stored value.');
                return null;
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid RegExp format in stored value.');
            return null;
        }
    }


    /**
     * Removes a RegExp object with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the RegExp object to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the RegExp object from sessionStorage; otherwise, removes the RegExp object from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not a valid RegExp object; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string, or if the stored value is not a valid RegExp object.
     *
     * @example
     *  Example usage:
     * js.StorageManager.removeRegExp('myRegExp', true);
     * 
     * @description
     * This method removes a RegExp object with the specified key from either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid RegExp object.
     * If successful, it removes the stored RegExp object; otherwise, it throws an error.
     *
     */
    static removeRegExp(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            // Check if the stored value is a string and represents a valid RegExp pattern
            if (typeof storedValue === 'string' && /^\/.*\/[gim]*$/.test(storedValue)) {
                storage.removeItem(key);
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not a valid RegExp object.`);
            }
        }
        catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing RegExp for key '${key}': ${error.message}`);
        }
    }


    /**
     * Removes all stored RegExp objects from either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes RegExp objects from sessionStorage; otherwise, removes RegExp objects from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for any encountered issues; otherwise, continues with the removal process.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if there is an issue removing RegExp objects.
     *
     * @example
     * Example usage:
     * js.StorageManager.removeAllRegExpItems(true);
     *
     * @description
     * This method removes all stored RegExp objects from either sessionStorage or localStorage.
     * If successful, it removes RegExp objects based on a basic pattern format check.
     * Throws an error if there is an issue removing RegExp objects.
     */
    static removeAllRegExpItems(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            // Iterate through all keys in storage
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                const storedValue = storage.getItem(key);

                // Check if the stored value is a string and represents a valid RegExp pattern
                if (typeof storedValue === 'string' && /^\/.*\/[gim]*$/.test(storedValue)) {
                    storage.removeItem(key);
                }
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing RegExp objects: ${error.message}`);
        }
    }


    /**
     * Stores an 'undefined' value with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored 'undefined' value.
     * @param {boolean} [useSessionStorage=false] - If true, stores the 'undefined' value in sessionStorage; otherwise, stores the 'undefined' value in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     * Example usage:
     * js.StorageManager.setUndefined('myUndefinedKey', true);
     *
     * @description
     * This method stores an 'undefined' value with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string.
     */
    static setUndefined(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            storage.setItem(key, undefined);
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error storing 'undefined' value for key '${key}': ${error.message}`);
        }
    }

    /**
     * Checks if the value associated with the specified key is 'undefined' in either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the value to be checked.
     * @param {boolean} [useSessionStorage=false] - If true, checks for the value in sessionStorage; otherwise, checks for the value in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {boolean|null} - Returns true if the value associated with the key is 'undefined'; otherwise, returns false. Returns null if the key or stored value is invalid.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     * // Example usage:
     * const isValueUndefined = js.StorageManager.isUndefined('myUndefinedKey', true);
     */
    static isUndefined(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        return storedValue === undefined;
    }


    /**
     * Removes a value associated with the specified key if it is 'undefined' from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the value to be removed if it is 'undefined'.
     * @param {boolean} [useSessionStorage=false] - If true, removes the value from sessionStorage; otherwise, removes the value from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     * Example usage:
     * js.StorageManager.removeUndefined('myUndefinedKey', true);
     *
     * @description
     * This method removes a value associated with the specified key from either sessionStorage or localStorage if it is 'undefined'.
     * Throws an error if the 'key' parameter is not a string.
     */
    static removeUndefined(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (storedValue === undefined) {
            try {
                storage.removeItem(key);
            } catch (error) {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing 'undefined' value for key '${key}': ${error.message}`);
            }
        }
    }


    /**
     * Removes all values with keys associated with 'undefined' values from either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes the values from sessionStorage; otherwise, removes the values from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for any encountered error during the removal process; otherwise, continues with the removal process.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if any encountered error during the removal process and 'throwOnError' is set to true.
     *
     * @example
     * Example usage:
     * js.StorageManager.removeAllUndefined(true);
     *
     * @description
     * This method removes all values with keys associated with 'undefined' values from either sessionStorage or localStorage.
     * Throws an error if any encountered error during the removal process and 'throwOnError' is set to true.
     */
    static removeAllUndefined(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                const storedValue = storage.getItem(key);

                if (storedValue === undefined) {
                    storage.removeItem(key);
                    i--; // Adjust the index to account for removal
                }
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing values associated with 'undefined' keys: ${error.message}`);
        }
    }


    /**
     * Stores a 'null' value with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored 'null' value.
     * @param {boolean} [useSessionStorage=false] - If true, stores the 'null' value in sessionStorage; otherwise, stores the 'null' value in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string.
     *
     * @example
     *  Example usage:
     *  js.StorageManager.setNull('myKey', true);
     *
     * @description
     * This method stores a 'null' value with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string.
     */
    static setNull(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            storage.setItem(key, 'null');
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error storing 'null' for key '${key}': ${error.message}`);
        }
    }


    /**
     * Checks if a 'null' value is stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the stored value.
     * @param {boolean} [useSessionStorage=false] - If true, checks for the 'null' value in sessionStorage; otherwise, checks for the 'null' value in localStorage.
     *
     * @return {boolean} - Returns true if a 'null' value is stored with the specified key; otherwise, returns false.
     *
     * @example
     *  Example usage:
     *  const isNullValue = js.StorageManager.isNull('myKey', true);
     */
    static isNull(key, useSessionStorage = false) {
        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        return storedValue === 'null';
    }


    /**
     * Removes a 'null' value with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the 'null' value to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the 'null' value from sessionStorage; otherwise, removes the 'null' value from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a 'null' value.
     *
     * @example
     *  Example usage:
     *  js.StorageManager.removeNull('myKey', true);
     */
    static removeNull(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        if (storedValue === 'null') {
            storage.removeItem(key);
        } else {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not a 'null' value.`);
        }
    }


    /**
     * Removes all 'null' values stored in either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes all 'null' values from sessionStorage; otherwise, removes all 'null' values from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for any unexpected issues; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if any unexpected issues occur during the removal process.
     *
     * @example
     *  Example usage:
     *  js.StorageManager.removeAllNullItems(true);
     *
     * @description
     * This method removes all 'null' values stored in either sessionStorage or localStorage.
     * Throws an error if any unexpected issues occur during the removal process.
     */
    static removeAllNullItems(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                const storedValue = storage.getItem(key);

                if (storedValue === 'null') {
                    storage.removeItem(key);
                    // Adjust index to account for removal
                    i--;
                }
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing 'null' values: ${error.message}`);
        }
    }


    /**
     * Stores a BigInt with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored BigInt.
     * @param {BigInt} bigInt - The BigInt to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, stores the BigInt in sessionStorage; otherwise, stores the BigInt in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not a valid BigInt; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid BigInt.
     *
     * @example
     * // Example usage:
     * const myBigInt = BigInt('12345678901234567890');
     * js.StorageManager.setBigInt('myKey', myBigInt, true);
     *
     * @description
     * This method stores a BigInt with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid BigInt.
     */
    static setBigInt(key, bigInt, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        if (typeof bigInt !== 'bigint') {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid BigInt value.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            storage.setItem(key, bigInt.toString());
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error storing BigInt for key '${key}': ${error.message}`);
        }

        return this;
    }


    /**
     * Retrieves a BigInt with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the BigInt to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not a valid BigInt; otherwise, returns null.
     *
     * @return {BigInt|null} - Returns null if the key or stored value is invalid or if the stored value is not a valid BigInt, or the retrieved BigInt if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid BigInt.
     *
     * @example
     * Example usage:
     * const retrievedBigInt = js.StorageManager.getBigInt('myKey', true);
     *
     * @description
     * This method retrieves a BigInt with the specified key from either sessionStorage or localStorage.
     * If successful, it returns the retrieved BigInt; otherwise, it returns null.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid BigInt.
     */
    static getBigInt(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            const retrievedBigInt = storedValue ? BigInt(storedValue) : null;

            if (retrievedBigInt !== null && typeof retrievedBigInt === 'bigint') {
                return retrievedBigInt;
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not a valid BigInt.`);
                return null;
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error retrieving BigInt for key '${key}': ${error.message}`);
            return null;
        }
    }


    /**
     * Removes a BigInt with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the BigInt to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the BigInt from sessionStorage; otherwise, removes the BigInt from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid BigInt.
     *
     * @example
     *  Example usage:
     *  js.StorageManager.removeBigInt('myKey', true);
     * 
     * @description
     * This method removes a BigInt with the specified key from either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid BigInt
     */
    static removeBigInt(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            const retrievedBigInt = storedValue ? BigInt(storedValue) : null;

            if (retrievedBigInt !== null && typeof retrievedBigInt === 'bigint') {
                storage.removeItem(key);
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not a valid BigInt.`);
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing BigInt for key '${key}': ${error.message}`);
        }
    }


    /**
     * Removes all stored BigInt items from either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes BigInt items from sessionStorage; otherwise, removes BigInt items from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid items; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if any stored value is not a valid BigInt.
     *
     * @example
     * Example usage:
     * js.StorageManager.removeAllBigIntItems(true);
     * 
     * @description
     * This method removes all stored BigInt items from either sessionStorage or localStorage.
     * Throws an error if any stored value is not a valid BigInt.
     */
    static removeAllBigIntItems(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i);
            const storedValue = storage.getItem(key);

            try {
                const retrievedBigInt = storedValue ? BigInt(storedValue) : null;

                if (retrievedBigInt !== null && typeof retrievedBigInt === 'bigint') {
                    storage.removeItem(key);
                } else {
                    GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not a valid BigInt.`);
                }
            } catch (error) {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing BigInt for key '${key}': ${error.message}`);
            }
        }
    }


    /**
     * Stores binary data with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored binary data.
     * @param {Uint8Array} binaryData - The binary data to be stored.
     * @param {boolean} [useSessionStorage=false] - If true, stores the binary data in sessionStorage; otherwise, stores the binary data in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not valid binary data; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not valid binary data.
     *
     * @example
     * Example usage:
     * const myBinaryData = new Uint8Array([1, 2, 3, 4, 5]);
     * js.StorageManager.setBinary('myKey', myBinaryData, true);
     *
     * @description
     * This method stores binary data with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not valid binary data.
     */
    static setBinary(key, binaryData, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        if (!(binaryData instanceof Uint8Array)) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid binary data: It must be a Uint8Array.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            storage.setItem(key, JSON.stringify(Array.from(binaryData)));
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error storing binary data for key '${key}': ${error.message}`);
        }

        return this;
    }

    /**
     * Retrieves binary data with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the binary data to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not valid binary data; otherwise, returns null.
     *
     * @return {Uint8Array|null} - Returns null if the key or stored value is invalid or if the stored value is not valid binary data, or the retrieved binary data if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string, if the stored value is not valid binary data, or if the stored value is not a Uint8Array.
     *
     * @example
     *  Example usage:
     *  const retrievedBinaryData = js.StorageManager.getBinary('myKey', true);
     *
     * @description
     * This method retrieves binary data with the specified key from either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string, if the stored value is not valid binary data, or if the stored value is not a Uint8Array.
     */
    static getBinary(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            if (typeof storedValue === 'string') {
                const parsedArray = JSON.parse(storedValue);
                const binaryData = new Uint8Array(parsedArray);

                if (binaryData instanceof Uint8Array) {
                    return binaryData;
                } else {
                    GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not a valid binary data.`);
                    return null;
                }
            }
            return null;
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid binary data format in stored value.');
            return null;
        }
    }


    /**
    * Removes binary data with the specified key from either sessionStorage or localStorage.
    *
    * @param {string} key - The key of the binary data to be removed.
    * @param {boolean} [useSessionStorage=false] - If true, removes the binary data from sessionStorage; otherwise, removes the binary data from localStorage.
    * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not valid binary data; otherwise, returns null.
    *
    * @return {void}
    *
    * @throws {Error} - Throws an error if the 'key' parameter is not a string, if the stored value is not valid binary data, or if the stored value is not a Uint8Array.
    *
    * @example
    *  Example usage:
    *  js.StorageManager.removeBinary('myKey', true);
    *
    * @description
    * This method removes binary data with the specified key from either sessionStorage or localStorage.
    * Throws an error if the 'key' parameter is not a string, if the stored value is not valid binary data, or if the stored value is not a Uint8Array.
    */
    static removeBinary(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            if (typeof storedValue === 'string') {
                const parsedArray = JSON.parse(storedValue);
                const binaryData = new Uint8Array(parsedArray);

                if (binaryData instanceof Uint8Array) {
                    storage.removeItem(key);
                } else {
                    GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not a valid binary data.`);
                }
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not valid binary data.`);
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing binary data for key '${key}': ${error.message}`);
        }
    }


    /**
     * Removes all binary data items from either sessionStorage or localStorage.
     *
     * @param {boolean} [useSessionStorage=false] - If true, removes all binary data items from sessionStorage; otherwise, removes all binary data items from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for any invalid values; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if any stored value is not valid binary data or if any stored value is not a Uint8Array.
     *
     * @example
     * Example usage:
     * js.StorageManager.removeAllBinaryItems(true);
     *
     * @description
     * This method removes all binary data items from either sessionStorage or localStorage.
     * Throws an error if any stored value is not valid binary data or if any stored value is not a Uint8Array.
     */
    static removeAllBinaryItems(useSessionStorage = false, throwOnError = true) {
        const storage = useSessionStorage ? sessionStorage : localStorage;

        for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i);
            const storedValue = storage.getItem(key);

            try {
                if (typeof storedValue === 'string') {
                    const parsedArray = JSON.parse(storedValue);
                    const binaryData = new Uint8Array(parsedArray);

                    if (!(binaryData instanceof Uint8Array)) {
                        GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not a valid binary data.`);
                    }
                } else {
                    GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not valid binary data.`);
                }
            } catch (error) {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing binary data for key '${key}': ${error.message}`);
            }
        }

        storage.clear();
    }


    /**
     * Stores an encrypted string with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored encrypted string.
     * @param {string} data - The string to be encrypted and stored.
     * @param {boolean} [useSessionStorage=false] - If true, stores the encrypted string in sessionStorage; otherwise, stores it in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if encryption fails; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if encryption fails.
     *
     * @example
     * Example usage:
     * const sensitiveData = 'This is a secret';
     * StorageManager.setEncrypted('myKey', sensitiveData, true);
     *
     * @description
     * This method stores an encrypted string with the specified key in either sessionStorage or localStorage.
     * It uses the AES encryption algorithm from the crypto-js library. Throws an error if the 'key' parameter is not a string or if encryption fails.
     */
    static setEncrypted(key, data, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const encryptedData = CryptoJS.AES.encrypt(data, 'your-secret-key').toString();

        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.setItem(key, encryptedData);

        return this;
    }


    /**
     * Retrieves the decrypted string with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the encrypted string to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if decryption fails; otherwise, returns null.
     *
     * @return {string|null} - Returns null if the key or stored value is invalid or if decryption fails, or the decrypted string if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if decryption fails.
     *
     * @example
     * Example usage:
     * const decryptedData = StorageManager.getDecrypted('myKey', true);
     *
     * @description
     * This method retrieves the decrypted string with the specified key from either sessionStorage or localStorage.
     * It uses the AES decryption algorithm from the crypto-js library. Returns null if the key or stored value is invalid or if decryption fails.
     * Throws an error if the 'key' parameter is not a string or if decryption fails.
     */
    static getDecrypted(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const encryptedValue = storage.getItem(key);

        try {
            const decryptedData = encryptedValue ? CryptoJS.AES.decrypt(encryptedValue, 'your-secret-key').toString(CryptoJS.enc.Utf8) : null;
            return decryptedData;
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Error during decryption. Invalid encrypted value or key.');
            return null;
        }
    }


    /**
     * Removes an encrypted string with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the encrypted string to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the encrypted string from sessionStorage; otherwise, removes it from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not a valid encrypted string; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid encrypted string.
     *
     * @example
     * Example usage:
     * StorageManager.removeEncrypted('myKey', true);
     *
     * @description
     * This method removes an encrypted string with the specified key from either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid encrypted string.
     */
    static removeEncrypted(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const encryptedValue = storage.getItem(key);

        try {
            CryptoJS.AES.decrypt(encryptedValue, 'your-secret-key').toString(CryptoJS.enc.Utf8);
            storage.removeItem(key);
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing encrypted string for key '${key}': ${error.message}`);
        }
    }


    /**
     * Stores a hashed string with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored hashed string.
     * @param {string} data - The string to be hashed and stored.
     * @param {boolean} [useSessionStorage=false] - If true, stores the hashed string in sessionStorage; otherwise, stores it in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if hashing fails; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if hashing fails.
     *
     * @example
     * Example usage:
     * const sensitiveData = 'This is a secret';
     * StorageManager.setHashed('myKey', sensitiveData, true);
     *
     * @description
     * This method stores a hashed string with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if hashing fails.
     */
    static setHashed(key, data, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        // Hash the data
        const hashedData = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);

        // Store the hashed data
        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.setItem(key, hashedData);

        return this;
    }


    /**
     * Retrieves a hashed string with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the hashed string to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not a valid hashed string; otherwise, returns null.
     *
     * @return {string|null} - Returns null if the key or stored value is invalid or if the stored value is not a valid hashed string, or the retrieved hashed string if successful.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid hashed string.
     *
     * @example
     * Example usage:
     * const retrievedHashedData = StorageManager.getHashed('myKey', true);
     *
     * @description
     * This method retrieves a hashed string with the specified key from either sessionStorage or localStorage.
     * If successful, it returns the retrieved hashed string; otherwise, it returns null.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid hashed string.
     */
    static getHashed(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;
        const storedValue = storage.getItem(key);

        try {
            if (storedValue && /^[a-f0-9]{64}$/i.test(storedValue)) {
                return storedValue ? storedValue : null;
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not a valid hashed string.`);
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid hashed string format in stored value.');
            return null;
        }
    }


    /**
     * Removes a hashed string with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the hashed string to be removed.
     * @param {boolean} [useSessionStorage=false] - If true, removes the hashed string from sessionStorage; otherwise, removes it from localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not a valid hashed string; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid hashed string.
     *
     * @example
     * Example usage:
     * StorageManager.removeHashed('myKey', true);
     *
     * @description
     * This method removes a hashed string with the specified key from either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid hashed string.
     */
    static removeHashed(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        const storage = useSessionStorage ? sessionStorage : localStorage;

        try {
            const storedValue = storage.getItem(key);

            // Check if the stored value is a valid hashed string
            if (storedValue && /^[a-f0-9]{64}$/i.test(storedValue)) {
                storage.removeItem(key);
            } else {
                GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Value stored for key '${key}' is not a valid hashed string.`);
            }
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error removing hashed string for key '${key}': ${error.message}`);
        }
    }


    /**
     * Compares a string with a hashed value stored with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the hashed string to be compared.
     * @param {string} data - The string to be compared with the stored hashed value.
     * @param {boolean} [useSessionStorage=false] - If true, compares the string with the hashed value in sessionStorage; otherwise, compares it with the hashed value in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not a valid hashed string; otherwise, returns null.
     *
     * @return {boolean|null} - Returns true if the string matches the stored hashed value, false if they do not match, or null if there is an error or the stored value is not a valid hashed string.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid hashed string.
     *
     * @example
     * Example usage:
     * const isMatch = StorageManager.compareHashed('myKey', 'myString', true);
     *
     * @description
     * This method compares a string with a hashed value stored with the specified key in either sessionStorage or localStorage.
     * Returns true if the string matches the stored hashed value, false if they do not match, or null if there is an error or the stored value is not a valid hashed string.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid hashed string.
     */
    static compareHashed(key, data, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        // Retrieve the hashed value from storage
        const storedHashedValue = this.getHashed(key, useSessionStorage, throwOnError);

        try {
            // Compare the input string with the stored hashed value
            if (storedHashedValue) {
                const inputHashedValue = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
                return inputHashedValue === storedHashedValue;
            }

            return null;
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error comparing hashed string for key '${key}': ${error.message}`);
            return null;
        }
    }


    /**
     * Stores a compressed string with the specified key in either sessionStorage or localStorage.
     *
     * @param {string} key - The key to identify the stored compressed string.
     * @param {string} data - The string to be compressed and stored.
     * @param {boolean} [useSessionStorage=false] - If true, stores the compressed string in sessionStorage; otherwise, stores it in localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if compression fails; otherwise, returns null.
     *
     * @return {void}
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if compression fails.
     *
     * @example
     * Example usage:
     * const dataToCompress = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
     * StorageManager.setCompressed('myKey', dataToCompress, true);
     *
     * @description
     * This method stores a compressed string with the specified key in either sessionStorage or localStorage.
     * Throws an error if the 'key' parameter is not a string or if compression fails.
     */
    static setCompressed(key, data, useSessionStorage = false, throwOnError = true) {
        // Check key validity
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return;
        }

        // Compress the data
        const compressedData = LZString.compress(data);

        // Store the compressed data
        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.setItem(key, compressedData);
    }


    /**
     * Retrieves a decompressed string with the specified key from either sessionStorage or localStorage.
     *
     * @param {string} key - The key of the compressed string to be retrieved.
     * @param {boolean} [useSessionStorage=false] - If true, uses sessionStorage; otherwise, uses localStorage.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters or if the stored value is not a valid compressed string; otherwise, returns null.
     *
     * @return {string|null} - Returns the decompressed string if successful, or null if there is an error or the stored value is not a valid compressed string.
     *
     * @throws {Error} - Throws an error if the 'key' parameter is not a string or if the stored value is not a valid compressed string.
     *
     * @example
     * Example usage:
     * const decompressedData = StorageManager.getCompressed('myKey', true);
     * console.log(decompressedData);
     *
     * @description
     * This method retrieves a decompressed string with the specified key from either sessionStorage or localStorage.
     * If successful, it returns the decompressed string; otherwise, it returns null.
     * Throws an error if the 'key' parameter is not a string or if the stored value is not a valid compressed string.
     */
    static getCompressed(key, useSessionStorage = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: key, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "key" must be a string.');
            return null;
        }

        // Retrieve the compressed data from storage
        const storage = useSessionStorage ? sessionStorage : localStorage;
        const compressedData = storage.getItem(key);

        try {
            // Decompress the data
            return compressedData ? LZString.decompress(compressedData) : null;
        } catch (error) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, `Error decompressing string for key '${key}': ${error.message}`);
            return null;
        }
    }
    

    /**
     * Logs all the available static functions in the StorageManager class to the console.
     *
     * @return {void}
     *
     * @example
     * // Example usage:
     * // StorageManager.logAvailableFunctions();
     *
     * @description
     * This method logs all the available static functions in the StorageManager class to the console.
     */
    static logAvailableFunctions() {
        const functionNames = Object.getOwnPropertyNames(StorageManager).filter(name => typeof StorageManager[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');

        console.log(`Available static functions in StorageManager class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
    }
}


export { StorageManager }

