/**
 * A class for handling DOM elements with utility methods.
 */

import { DomValidator as GET_ELEMENT_VALIDATION } from "../../validation/validation.js";


/**
 * Utility class for handling DOM elements with various methods.
 *
 * The `ElementHandler` class provides utility methods for interacting with DOM elements,
 * including retrieving elements by ID or class, managing classes, updating element attributes, and more.
 * It offers a set of actions for class management such as adding, toggling, and removing classes.
 * This class aims to simplify common tasks related to DOM manipulation in web development.
 *
 * @class
 */
class ElementHandler {

    /**
     * An object containing possible actions for managing classes.
     * @type {{add: string, toggle: string, remove: string}}
     */

    static ACTIONS = {
        add: 'add',
        toggle: 'toggle',
        remove: 'remove'
    };


    /**
     * Retrieves an element from the DOM by its ID.
     *
     * @param {string} elementId - The ID of the element to retrieve.
     * @param {boolean} [throwOnError=true] - Whether to throw an error if the element is not found.
     *
     * @returns {HTMLElement|null} The DOM element with the given ID, or null if not found and throwOnError is false.
     *
     * @throws {Error} If the element is not found and throwOnError is true.
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Retrieve an element by its ID
     * const headerElement = ElementHandler.retrieveElementById('header');
     *
     * @output
     * // If element is found, returns the HTMLElement; otherwise, throws an error.
     *
     * @description
     * The `retrieveElementById` function retrieves an element from the DOM by its ID.
     * It takes an optional parameter `throwOnError` to control whether an error is thrown if the element is not found.
     * If the element is found, it returns the corresponding HTMLElement; otherwise, it returns null or throws an error based on the `throwOnError` parameter.
     */
    static retrieveElementById(elementId, throwOnError = true) {

        if (!GET_ELEMENT_VALIDATION.isString({ param: elementId, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }

        const element = document.getElementById(elementId);

        if (!element && throwOnError) {
            throw new Error(`Element with id ${elementId} does not exist`);
        }

        return element;
    }


    /**
     * Retrieves elements from the DOM by class name.
     *
     * @param {string} className - The class name to search for.
     * @param {'HTMLCollection'|'array'} [returnType='HTMLCollection'] - The type of object to return.
     * @param {boolean} [throwOnError=true] - Whether to throw an error for invalid parameters.
     *
     * @returns {HTMLCollection | Array} The matching elements as an HTMLCollection or Array.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Retrieve elements by class name
     * const headerElements = ElementHandler.retrieveElementByClass('header');
     *
     * @output
     * // Returns an HTMLCollection or Array of matching elements; throws an error if parameters are invalid and throwOnError is true.
     *
     * @description
     * The `retrieveElementByClass` function retrieves elements from the DOM by their class name.
     * It takes an optional parameter `returnType` to specify the type of object to return (HTMLCollection or Array).
     * The optional parameter `throwOnError` controls whether an error is thrown for invalid parameters.
     * If the parameters are valid, it returns the matching elements as an HTMLCollection or Array.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static retrieveElementByClass(className, returnType = 'HTMLCollection', throwOnError = true) {

        if (!GET_ELEMENT_VALIDATION.isString({ param: className, throwOnError })
            || !GET_ELEMENT_VALIDATION.existInArray({ param: returnType, throwOnError }, ['array', 'HTMLCollection'], 'HTMLCollection')) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        const elements = document.getElementsByClassName(className);
        return returnType === 'array' ? Array.from(elements) : elements;
    }


    /**
     * Retrieve a single DOM element using a CSS selector.
     *
     * @param {string} selector - The CSS selector to use.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {HTMLElement|null} The matching DOM element or null if not found and throwOnError is false.
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * const element = ElementHandler.retreiveByQuery('.example-class');
     * ConsoleLogger.log(element); // Returns the matching DOM element or null if not found.
     *
     * @description
     * The `retreiveByQuery` function retrieves a single DOM element using the provided CSS selector.
     * It returns the matching element or null if not found, depending on the `throwOnError` parameter.
     */
    static retreiveByQuery(selector, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: selector, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        const element = document.querySelector(selector);

        if (!element && throwOnError) {
            throw new Error(`No element found with selector: ${selector}`);
        }
        return element;
    }


    /**
     * Retrieve DOM elements using a CSS selector.
     *
     * @param {string} selector - The CSS selector to use.
     * @param {'NodeList'|'array'} [returnType='NodeList'] - The type of object to return.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {NodeList|Array} The matching DOM elements as a NodeList or Array.
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * const elements = ElementHandler.retreiveAllByQuery('.example-class');
     * ConsoleLogger.log(elements); // Returns the matching DOM elements as a NodeList or Array.
     *
     * @description
     * The `retreiveAllByQuery` function retrieves DOM elements using the provided CSS selector.
     * It returns the matching elements as a NodeList or Array, depending on the `returnType` parameter,
     * or null if not found and throwOnError is false.
     */
    static retreiveAllByQuery(selector, returnType = 'NodeList', throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: selector, throwOnError })
            || !GET_ELEMENT_VALIDATION.existInArray({ param: returnType, throwOnError }, ['array', 'NodeList'], 'NodeList')) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        const elements = document.querySelectorAll(selector);

        if (!elements.length && throwOnError) {
            throw new Error(`No elements found with selector: ${selector}`);
        }
        return returnType === 'array' ? Array.from(elements) : elements;
    }



    /**
     * Removes the id attribute from a DOM element.
     *
     * @param {HTMLElement} targetElement - The element to remove the id from.
     * @param {boolean} [throwOnError=true] - Whether to throw an error for invalid parameters.
     *
     * @returns {void}
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Remove the id attribute from an element
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * ElementHandler.removeId(myElement);
     *
     * @description
     * The `removeId` function removes the id attribute from a DOM element.
     * It takes an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it removes the id attribute from the specified element.
     * If parameters are invalid, it throws an error or returns early based on the `throwOnError` parameter.
     */
    static removeId(targetElement, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return;
            }
        }

        targetElement.removeAttribute('id');
    }


    /**
     * Updates the id of a DOM element.
     *
     * @param {HTMLElement} targetElement - The element to update.
     * @param {string} newId - The new id to set on the element.
     * @param {boolean} [throwOnError=true] - Whether to throw an error for invalid parameters.
     *
     * @returns {void}
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Update the id of an element
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * ElementHandler.updateId(myElement, 'newId');
     *
     * @description
     * The `updateId` function updates the id of a DOM element.
     * It takes the `targetElement` parameter, which is the element to update,
     * the `newId` parameter, which is the new id to set on the element,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it updates the id of the specified element.
     * If parameters are invalid, it throws an error or returns early based on the `throwOnError` parameter.
     */
    static updateId(targetElement, newId, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: newId, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return;
            }
        }
        targetElement.id = newId;
    }


    /**
     * Removes all classes from a DOM element.
     *
     * @param {HTMLElement} element - The element to remove classes from.
     * @param {boolean} [throwOnError=true] - Whether to throw an error for invalid parameters.
     *
     * @returns {void}
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Remove all classes from an element
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * ElementHandler.removeAllClasses(myElement);
     *
     * @description
     * The `removeAllClasses` function removes all classes from a DOM element.
     * It takes the `element` parameter, which is the element to remove classes from,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it removes all classes from the specified element.
     * If parameters are invalid, it throws an error or returns early based on the `throwOnError` parameter.
     */
    static removeAllClasses(targetElement, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return;
            }
        }
        targetElement.className = '';
    }


    /**
     * Removes specific classes from a DOM element.
     *
     * @param {HTMLElement} targetElement - The element to remove classes from.
     * @param {Array<string>} arrayClasses - Array of class names to remove.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {void|null} Returns null if an error occurs and throwOnError is false.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Remove specific classes from an element
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * const classesToRemove = ['class1', 'class2'];
     * ElementHandler.removeSpecificClasses(myElement, classesToRemove);
     *
     * @description
     * The `removeClassesByNameList` function removes specific classes from a DOM element.
     * It takes the `targetElement` parameter, which is the element to remove classes from,
     * the `arrayClasses` parameter, which is an array of class names to remove,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it removes the specified classes from the element.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static removeClassesByNameList(targetElement, arrayClasses, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isArray({ param: arrayClasses, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }

        targetElement.classList.remove(...arrayClasses);
    }


    /**
     * Adds a class to a DOM element.
     *
     * @param {HTMLElement} targetElement - The element to add the class to.
     * @param {string} className - The class name to add.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {void|null} Returns null if an error occurs and throwOnError is false.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Add a class to an element
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * const newClass = 'newClass';
     * ElementHandler.addClass(myElement, newClass);
     *
     * @description
     * The `addClass` function adds a class to a DOM element.
     * It takes the `targetElement` parameter, which is the element to add the class to,
     * the `className` parameter, which is the class name to add,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it adds the specified class to the element.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static addClass(targetElement, className, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: className, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        targetElement.classList.add(className);
    }


    /**
     * Toggles a class on a DOM element by adding or removing it.
     *
     * @param {HTMLElement} targetElement - The element to toggle the class on.
     * @param {string} className - The class name to toggle.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {void|null} Returns null if an error occurs and throwOnError is false.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Toggle a class on an element
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * const toggleClass = 'toggleClass';
     * ElementHandler.toggleClass(myElement, toggleClass);
     *
     * @description
     * The `toggleClass` function toggles a class on a DOM element by adding it if it doesn't exist
     * or removing it if it already exists.
     * It takes the `targetElement` parameter, which is the element to toggle the class on,
     * the `className` parameter, which is the class name to toggle,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it toggles the specified class on the element.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static toggleClass(targetElement, className, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: className, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        targetElement.classList.toggle(className)
    }


    /**
     * Checks if a DOM element contains a specific class name.
     *
     * @param {HTMLElement} targetElement - The element to check.
     * @param {string} className - The class name to check for.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {boolean|null} Returns true if the element contains the class, false otherwise.
     *                        Returns null if an error occurs and throwOnError is false.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Check if an element has a specific class
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * const checkClass = 'checkClass';
     * const hasClass = ElementHandler.hasClass(myElement, checkClass);
     * ConsoleLogger.log(`Element has class ${checkClass}: ${hasClass}`);
     *
     * @description
     * The `hasClass` function checks if a DOM element contains a specific class name.
     * It takes the `targetElement` parameter, which is the element to check,
     * the `className` parameter, which is the class name to check for,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it returns true if the element contains the class and false otherwise.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static hasClass(targetElement, className, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: className, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        return targetElement.classList.contains(className);
    }


    /**
     * Toggles multiple classes on a DOM element by adding or removing them.
     *
     * @param {HTMLElement} targetElement - The element to toggle classes on.
     * @param {Array<string>} arrayClasses - Array of class names to toggle.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {void|null} Returns null if an error occurs and throwOnError is false.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Toggle multiple classes on an element
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * const classesToToggle = ['class1', 'class2', 'class3'];
     * ElementHandler.toggleClasses(myElement, classesToToggle);
     *
     * @description
     * The `toggleClasses` function toggles multiple classes on a DOM element.
     * It takes the `targetElement` parameter, which is the element to toggle classes on,
     * the `arrayClasses` parameter, which is an array of class names to toggle,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it toggles each class in the array on the element.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static toggleClasses(targetElement, arrayClasses, throwOnError = true) {

        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isArray({ param: arrayClasses, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        arrayClasses.forEach(className => {
            targetElement.classList.toggle(className);
        });
    }


    /**
     * Manages classes on a DOM element by adding, removing, or toggling them.
     *
     * @param {HTMLElement} targetElement - The element to manage classes on.
     * @param {string} className - The class to manage.
     * @param {'add'|'remove'|'toggle'} action - The action to perform on the class.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {void|null} Returns null if an error occurs and throwOnError is false.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     * @throws {Error} If action is invalid.
     *
     * @example
     * // Manage a class on an element
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * const className = 'myClass';
     * ElementHandler.manageClass(myElement, className, 'add');
     *
     * @description
     * The `manageClass` function manages classes on a DOM element by adding, removing, or toggling them.
     * It takes the `targetElement` parameter, which is the element to manage classes on,
     * the `className` parameter, which is the class to manage,
     * the `action` parameter, which is the action to perform on the class ('add', 'remove', or 'toggle'),
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it performs the specified action on the class.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static manageClass(targetElement, className, action = 'add', throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: className, throwOnError })
            || !GET_ELEMENT_VALIDATION.existInArray({ param: action, throwOnError }, ['add', 'remove', 'toggle'], 'add')) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        switch (action) {
            case ElementHandler.ACTIONS.add:
                targetElement.classList.add(className);
                break;
            case ElementHandler.ACTIONS.toggle:
                targetElement.classList.toggle(className);
                break;
            case ElementHandler.ACTIONS.remove:
                targetElement.classList.remove(className);
                break;
            default:
                throw new Error('Invalid action');
        }
    }


    /**
     * Replaces one class with another on a DOM element.
     *
     * @param {HTMLElement} targetElement - The element to modify.
     * @param {string} classToRemove - The class to remove.
     * @param {string} classToAdd - The class to add.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {void|null} Returns null if an error occurs and throwOnError is false.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Replace a class on an element
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * const classToRemove = 'oldClass';
     * const classToAdd = 'newClass';
     * ElementHandler.replaceClass(myElement, classToRemove, classToAdd);
     *
     * @description
     * The `replaceClass` function replaces one class with another on a DOM element.
     * It takes the `targetElement` parameter, which is the element to modify,
     * the `classToRemove` parameter, which is the class to remove,
     * the `classToAdd` parameter, which is the class to add,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it removes the specified class and adds the new class.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static replaceClass(targetElement, classToRemove, classToAdd, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: classToRemove, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: classToAdd, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        targetElement.classList.remove(classToRemove);
        targetElement.classList.add(classToAdd);
    }

    /**
     * Gets the value of a specific attribute on a DOM element.
     *
     * @param {HTMLElement} targetElement - The element to retrieve the attribute from.
     * @param {string} attributeName - The name of the attribute to retrieve.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {string|null} The value of the attribute or null if the attribute is not present.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Get the value of a specific attribute
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * const attributeValue = ElementHandler.getAttribute(myElement, 'data-custom');
     * ConsoleLogger.log(`Attribute value: ${attributeValue}`);
     *
     * @description
     * The `getAttribute` function gets the value of a specific attribute on a DOM element.
     * It takes the `targetElement` parameter, which is the element to retrieve the attribute from,
     * the `attributeName` parameter, which is the name of the attribute to retrieve,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it returns the value of the attribute or null if the attribute is not present.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static getAttribute(targetElement, attributeName, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: attributeName, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {

            }
        }
        return targetElement.getAttribute(attributeName);
    }


    /**
     * Sets the value of a specific attribute on a DOM element.
     *
     * @param {HTMLElement} targetElement - The element to update.
     * @param {string} attributeName - The name of the attribute to set.
     * @param {string} attributeValue - The value to set for the attribute.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {void|null} Returns null if an error occurs and throwOnError is false.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Set the value of a specific attribute
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * ElementHandler.setAttribute(myElement, 'data-custom', '123');
     *
     * @description
     * The `setAttribute` function sets the value of a specific attribute on a DOM element.
     * It takes the `targetElement` parameter, which is the element to update,
     * the `attributeName` parameter, which is the name of the attribute to set,
     * the `attributeValue` parameter, which is the value to set for the attribute,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it sets the value of the specified attribute.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static setAttribute(targetElement, attributeName, attributeValue, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: attributeName, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: attributeValue, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        targetElement.setAttribute(attributeName, attributeValue);
    }


    /**
     * Removes a specific attribute from a DOM element.
     *
     * @param {HTMLElement} targetElement - The element to remove the attribute from.
     * @param {string} attributeName - The name of the attribute to remove.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {void|null} Returns null if an error occurs and throwOnError is false.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Remove a specific attribute from an element
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * ElementHandler.removeAttribute(myElement, 'data-custom');
     *
     * @description
     * The `removeAttribute` function removes a specific attribute from a DOM element.
     * It takes the `targetElement` parameter, which is the element to remove the attribute from,
     * the `attributeName` parameter, which is the name of the attribute to remove,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it removes the specified attribute.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static removeAttribute(targetElement, attributeName, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: attributeName, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        targetElement.removeAttribute(attributeName);
    }


    /**
     * Checks if an element has a specific class name and/or ID.
     *
     * @param {HTMLElement} targetElement - The element to check.
     * @param {string} className - The class name to check for.
     * @param {string} id - The ID to check for.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {object|null}
     * Returns an object with the following properties:
     * - hasElement: Whether the target element exists.
     * - hasClass: Whether the element has the specified class.
     * - hasId: Whether the element has the specified ID.
     * Returns null if an error occurs and throwOnError is false.
     *
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Check if an element has a class and an ID
     * const myElement = ElementHandler.retrieveElementById('myElement');
     * const className = 'exampleClass';
     * const id = 'exampleId';
     * const result = ElementHandler.checkAttribute(myElement, className, id);
     * ConsoleLogger.log(result);
     *
     * @description
     * The `checkAttribute` function checks if an element has a specific class name and/or ID.
     * It takes the `targetElement` parameter, which is the element to check,
     * the `className` parameter, which is the class name to check for,
     * the `id` parameter, which is the ID to check for,
     * and an optional parameter `throwOnError` to control whether an error is thrown for invalid parameters.
     * If the parameters are valid, it returns an object indicating whether the element exists, has the specified class, and has the specified ID.
     * If parameters are invalid, it throws an error or returns null based on the `throwOnError` parameter.
     */
    static checkAttribute(targetElement, className, id, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: className, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: id, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        const hasClass = targetElement.classList.contains(className);
        const hasId = targetElement.id === id;

        return {
            hasElement: true,
            hasClass: `${className} / ${hasClass}`,
            hasId: `${id} / ${hasId}`
        };
    }


    /**
     * Set the text content of a DOM element.
     *
     * @param {HTMLElement} targetElement - The element to update.
     * @param {string} text - The new text content to set.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {void|null} Returns null if error and throwOnError is false.
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Set text content of an element
     * const element = ElementHandler.retrieveElementById('myElement');
     * ElementHandler.setTextContent(element, 'New Content');
     *
     * @description
     * The `setTextContent` function sets the text content of a given DOM element.
     * It requires the `targetElement` parameter, representing the element to update,
     * the `text` parameter, representing the new text content to set, and an optional
     * `throwOnError` parameter to control error handling.
     */
    static setTextContent(targetElement, text, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: text, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        targetElement.textContent = text;
    }


    /**
     * Set the inner HTML of a DOM element.
     *
     * @param {HTMLElement} targetElement - The element to update.
     * @param {string} html - The new HTML content to set.
     * @param {boolean} [throwOnError=true] - Whether to throw errors for invalid parameters.
     *
     * @returns {void|null} Returns null if error and throwOnError is false.
     * @throws {Error} If parameters are invalid and throwOnError is true.
     *
     * @example
     * // Set inner HTML of an element
     * const element = ElementHandler.retrieveElementById('myElement');
     * ElementHandler.setInnerHTML(element, '<p>New HTML Content</p>');
     *
     * @description
     * The `setInnerHTML` function sets the inner HTML content of a given DOM element.
     * It requires the `targetElement` parameter, representing the element to update,
     * the `html` parameter, representing the new HTML content to set, and an optional
     * `throwOnError` parameter to control error handling.
     */
    static setInnerHTML(targetElement, html, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: targetElement, throwOnError })
            || !GET_ELEMENT_VALIDATION.isString({ param: html, throwOnError })) {
            if (throwOnError) {
                throw new Error('Invalid parameters');
            } else {
                return null;
            }
        }
        targetElement.innerHTML = html;
    }


    /**
     * Logs all the available static functions in the ElementHandler class to the console.
     *
     * @return {void}
     *
     * @example
     * // Example usage:
     * // ElementBuilder.logAvailableFunctions();
     *
     * @description
     * This method logs all the available static functions in the ElementBuilder class to the console.
     */
    static logAvailableFunctions() {
        const functionNames = Object.getOwnPropertyNames(ElementHandler).filter(name => typeof ElementHandler[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');

        console.log(`Available functions in ElementHandler class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
    }

}

export { ElementHandler } 