import { ElementHandler } from "../ElementHandler/elementHandler";
import { DomValidator as GET_ELEMENT_VALIDATION } from "../../validation/validation";


/**
 * Class representing an Element Explorer for advanced manipulation and exploration of HTML elements.
 * Extends the functionality of the ElementHandler class by providing additional methods for in-depth exploration and manipulation of HTML elements.
 * This class is designed to offer advanced functionality beyond basic element handling, making it suitable for complex DOM interactions.
 *
 * @extends ElementHandler
 */

class ElementExplorer extends ElementHandler {

    /**
     * Retrieves the parent element of the given HTML element.
     *
     * @param {HTMLElement} element - The HTML element whose parent is to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     * 
     * @return {HTMLElement|null} - The parent element, or null if the element has no parent.
     * 
     * @throw {Error} - Throws an error if the 'element' parameter is not an object or if it's not provided (when throwOnError is true).
     * 
     * @example
     * // Example usage:
     * // Assuming 'childElement' is an HTML element.
     * const parentElement = ElementExplorer.getParent(childElement);
     * 
     * @output {HTMLElement|null} - The parent element of the given child element.
     * 
     * @description
     * This method retrieves the parent element of the provided HTML element.
     * If the 'element' parameter is not an object or has no parent, it returns null.
     * If throwOnError is true and 'element' is not provided or is not an object, it throws an error.
     * 
     * Note: The parent element is the direct ancestor in the HTML hierarchy.
     * If the 'element' is the root element or not an HTML element, it returns null.
     */
    static getParent(element, throwOnError = true) {

        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }
        if (!element) {
            throw new Error("'element' parameter is required.");
        }

        return element.parentElement || null;
    }


    /**
     * Retrieves an array of ancestor elements for the given HTML element.
     *
     * @param {HTMLElement} element - The HTML element whose ancestors are to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     * 
     * @return {Array<HTMLElement>|null} - An array of ancestor elements, or null if the element has no ancestors.
     * 
     * @throw {Error} - Throws an error if the 'element' parameter is not an object or if it's not provided (when throwOnError is true).
     * 
     * @example
     * // Example usage:
     * // Assuming 'targetElement' is an HTML element.
     * const ancestors = ElementExplorer.getAncestors(targetElement);
     * 
     * @output {Array<HTMLElement>|null} - An array containing the ancestor elements of the provided HTML element.
     * 
     * @description
     * This method retrieves an array of ancestor elements for the provided HTML element.
     * An ancestor element is any parent, grandparent, or further ancestor in the HTML hierarchy.
     * If the 'element' parameter is not an object or has no ancestors, it returns null.
     * If throwOnError is true and 'element' is not provided or is not an object, it throws an error.
     */
    static getAncestors(element, throwOnError = true) {

        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        const ancestors = [];
        let currentElement = element;

        while (currentElement.parentElement) {
            ancestors.push(currentElement.parentElement);
            currentElement = currentElement.parentElement;
        }
        return ancestors;

    }


    /**
 * Retrieves an array of child elements for the given HTML element.
 *
 * @param {HTMLElement} element - The HTML element whose child elements are to be retrieved.
 * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
 * 
 * @return {Array<HTMLElement>|null} - An array of child elements, or null if the element has no children.
 * 
 * @throw {Error} - Throws an error if the 'element' parameter is not an object or if it's not provided (when throwOnError is true).
 * 
 * @example
 * // Example usage:
 * // Assuming 'parentElement' is an HTML element.
 * const children = ElementExplorer.getChildren(parentElement);
 * 
 * @output {Array<HTMLElement>|null} - An array containing the child elements of the provided HTML element.
 * 
 * @description
 * This method retrieves an array of child elements for the provided HTML element.
 * If the 'element' parameter is not an object or has no children, it returns null.
 * If throwOnError is true and 'element' is not provided or is not an object, it throws an error.
 */
    static getChildren(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        return Array.from(element.children) || null;
    }

    /**
     * Retrieves the first child element for the given HTML element.
     *
     * @param {HTMLElement} element - The HTML element whose first child is to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     * 
     * @return {HTMLElement|null} - The first child element, or null if the element has no children.
     * 
     * @throw {Error} - Throws an error if the 'element' parameter is not an object or if it's not provided (when throwOnError is true).
     * 
     * @example
     * // Example usage:
     * // Assuming 'parentElement' is an HTML element.
     * const firstChild = ElementExplorer.getFirstChild(parentElement);
     * 
     * @output {HTMLElement|null} - The first child element of the provided HTML element.
     * 
     * @description
     * This method retrieves the first child element for the provided HTML element.
     * If the 'element' parameter is not an object or has no children, it returns null.
     * If throwOnError is true and 'element' is not provided or is not an object, it throws an error.
     */
    static getFirstChild(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        return element.firstElementChild || null;
    }

    /**
     * Retrieves the last child element for the given HTML element.
     *
     * @param {HTMLElement} element - The HTML element whose last child is to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     * 
     * @return {HTMLElement|null} - The last child element, or null if the element has no children.
     * 
     * @throw {Error} - Throws an error if the 'element' parameter is not an object or if it's not provided (when throwOnError is true).
     * 
     * @example
     * // Example usage:
     * // Assuming 'parentElement' is an HTML element.
     * const lastChild = ElementExplorer.getLastChild(parentElement);
     * 
     * @output {HTMLElement|null} - The last child element of the provided HTML element.
     * 
     * @description
     * This method retrieves the last child element for the provided HTML element.
     * If the 'element' parameter is not an object or has no children, it returns null.
     * If throwOnError is true and 'element' is not provided or is not an object, it throws an error.
     */
    static getLastChild(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        return element.lastElementChild || null;
    }


    /**
 * Retrieves the next sibling element for the given HTML element.
 *
 * @param {HTMLElement} element - The HTML element whose next sibling is to be retrieved.
 * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
 * 
 * @return {HTMLElement|null} - The next sibling element, or null if there is no next sibling.
 * 
 * @throw {Error} - Throws an error if the 'element' parameter is not an object or if it's not provided (when throwOnError is true).
 * 
 * @example
 * // Example usage:
 * // Assuming 'currentElement' is an HTML element.
 * // const nextSibling = ElementExplorer.getNextSibling(currentElement);
 * 
 * @output {HTMLElement|null} - The next sibling element of the provided HTML element.
 * 
 * @description
 * This method retrieves the next sibling element for the provided HTML element.
 * If the 'element' parameter is not an object or has no next sibling, it returns null.
 * If throwOnError is true and 'element' is not provided or is not an object, it throws an error.
 */
    static getNextSibling(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        return element.nextElementSibling || null;
    }

    /**
     * Retrieves the previous sibling element for the given HTML element.
     *
     * @param {HTMLElement} element - The HTML element whose previous sibling is to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     * 
     * @return {HTMLElement|null} - The previous sibling element, or null if there is no previous sibling.
     * 
     * @throw {Error} - Throws an error if the 'element' parameter is not an object or if it's not provided (when throwOnError is true).
     * 
     * @example
     * // Example usage:
     * // Assuming 'currentElement' is an HTML element.
     * // const previousSibling = ElementExplorer.getPreviousSibling(currentElement);
     * 
     * @output {HTMLElement|null} - The previous sibling element of the provided HTML element.
     * 
     * @description
     * This method retrieves the previous sibling element for the provided HTML element.
     * If the 'element' parameter is not an object or has no previous sibling, it returns null.
     * If throwOnError is true and 'element' is not provided or is not an object, it throws an error.
     */
    static getPreviousSibling(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        return element.previousElementSibling || null;
    }

    /**
     * Retrieves an array of all sibling elements for the given HTML element.
     *
     * @param {HTMLElement} element - The HTML element whose siblings are to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     * 
     * @return {Array<HTMLElement>|null} - An array of sibling elements, or null if there are no siblings.
     * 
     * @throw {Error} - Throws an error if the 'element' parameter is not an object or if it's not provided (when throwOnError is true).
     * 
     * @example
     *  Example usage:
     *  Assuming 'currentElement' is an HTML element.
     *  const siblings = ElementExplorer.getAllSiblings(currentElement);
     * 
     * @output {Array<HTMLElement>|null} - An array containing all sibling elements of the provided HTML element.
     * 
     * @description
     * This method retrieves an array of all sibling elements for the provided HTML element.
     * If the 'element' parameter is not an object or has no siblings, it returns null.
     * If throwOnError is true and 'element' is not provided or is not an object, it throws an error.
     */
    static getAllSiblings(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        const siblings = Array.from(element.parentElement.children);
        const index = siblings.indexOf(element);

        if (index !== -1) {
            siblings.splice(index, 1);
        }

        return siblings.length > 0 ? siblings : null;
    }


    /**
     * Retrieves the child element at the specified index for the given HTML element.
     *
     * @param {HTMLElement} element - The HTML element whose child is to be retrieved.
     * @param {number} index - The index of the child element to retrieve.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     * 
     * @return {HTMLElement|null} - The child element at the specified index, or null if not found.
     * 
     * @throw {Error} - Throws an error if the 'element' parameter is not an object, if the 'index' parameter is not a number,
     * or if 'element' is not provided (when throwOnError is true).
     * 
     * @example
     *  Example usage:
     *  Assuming 'parentElement' is an HTML element.
     *  const childAtIndex = ElementExplorer.getChildByIndex(parentElement, 2);
     * 
     * @output {HTMLElement|null} - The child element at the specified index of the provided HTML element.
     * 
     * @description
     * This method retrieves the child element at the specified index for the provided HTML element.
     * If the 'element' parameter is not an object, the 'index' parameter is not a number, or the child is not found,
     * it returns null.
     * If throwOnError is true and 'element' is not provided or is not an object, it throws an error.
     */
    static getChildByIndex(element, index, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: index, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        const children = Array.from(element.children);
        return children[index] || null;
    }


    /**
 * Retrieves all descendants (children, grandchildren, etc.) of the provided HTML element.
 *
 * @param {HTMLElement} element - The HTML element whose descendants are to be retrieved.
 * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns an empty array.
 * 
 * @return {Array<HTMLElement>} - An array containing all descendants of the provided HTML element.
 * 
 * @throw {Error} - Throws an error if the 'element' parameter is not an object or if 'element' is not provided (when throwOnError is true).
 * 
 * @example
 * // Example usage:
 * // Assuming 'parentElement' is an HTML element.
 * // const descendants = ElementExplorer.getDescendants(parentElement);
 * 
 * @output {Array<HTMLElement>} - An array of all descendants of the provided HTML element.
 * 
 * @description
 * This method retrieves all descendants (children, grandchildren, etc.) of the provided HTML element.
 * If the 'element' parameter is not an object or is not provided, it returns an empty array.
 * If throwOnError is true and 'element' is not provided or is not an object, it throws an error.
 */
    static getDescendants(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        const descendants = [];
        const queue = [element];

        while (queue.length > 0) {
            const currentElement = queue.shift();
            descendants.push(...currentElement.children);
            queue.push(...currentElement.children);
        }

        return descendants;
    }


    /**
 * Retrieves descendants of the provided HTML element based on the specified tag name.
 *
 * @param {HTMLElement} element - The HTML element whose descendants are to be retrieved.
 * @param {string} tagName - The tag name of the descendants to filter.
 * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns an empty array.
 * 
 * @return {Array<HTMLElement>} - An array containing descendants with the specified tag name.
 * 
 * @throw {Error} - Throws an error if the 'element' parameter is not an object, the 'tagName' parameter is not a string, or if 'element' is not provided (when throwOnError is true).
 * 
 * @example
 * // Example usage:
 * // Assuming 'parentElement' is an HTML element and 'div' is the tag name.
 * // const descendantsByTagName = ElementExplorer.getDescendantsByTagName(parentElement, 'div');
 * 
 * @output {Array<HTMLElement>} - An array of descendants with the specified tag name.
 * 
 * @description
 * This method retrieves descendants of the provided HTML element based on the specified tag name.
 * If the 'element' parameter is not an object, the 'tagName' parameter is not a string, or 'element' is not provided, it returns an empty array.
 * If throwOnError is true and 'element' or 'tagName' is not provided or is not of the expected type, it throws an error.
 */
    static getDescendantsByTagName(element, tagName, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: tagName, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        const descendants = Array.from(element.getElementsByTagName(tagName));
        return descendants;
    }


    /**
     * Filters the descendants of the provided HTML element based on the specified class name.
     *
     * @param {HTMLElement} element - The HTML element whose descendants are to be filtered.
     * @param {string} className - The class name used for filtering descendants.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns an empty array.
     *
     * @throws {Error} Throws an error if the 'element' parameter is not an object, the 'className' parameter is not a string, or if 'element' is not provided (when throwOnError is true).
     *
     * @return {Array<HTMLElement>} - An array containing descendants with the specified class name.
     *
     * @example
     * // Example usage:
     * // Assuming 'parentElement' is an HTML element and 'exampleClass' is the class name.
     * // const descendantsByClass = ElementExplorer.filterByClass(parentElement, 'exampleClass');
     *
     * @output {Array<HTMLElement>} - An array of descendants with the specified class name.
     *
     * @description
     * This method filters the descendants of the provided HTML element based on the specified class name.
     * If the 'element' parameter is not an object, the 'className' parameter is not a string, or 'element' is not provided, it returns an empty array.
     * If throwOnError is true and 'element' or 'className' is not provided or is not of the expected type, it throws an error.
     */
    static filterByClass(element, className, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: className, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        const descendants = Array.from(element.getElementsByClassName(className));
        return descendants;
    }

    /**
     * Filters the descendants of the provided HTML element based on the specified attribute and its value.
     *
     * @param {HTMLElement} element - The HTML element whose descendants are to be filtered.
     * @param {string} attribute - The attribute used for filtering descendants.
     * @param {string} value - The value of the attribute to filter descendants.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns an empty array.
     *
     * @throws {Error} Throws an error if the 'element' parameter is not an object, the 'attribute' parameter is not a string, the 'value' parameter is not a string, or if 'element' is not provided (when throwOnError is true).
     *
     * @return {Array<HTMLElement>} - An array containing descendants with the specified attribute and value.
     *
     * @example
     * // Example usage:
     * // Assuming 'parentElement' is an HTML element, 'data-type' is the attribute, and 'exampleValue' is the value.
     * // const descendantsByAttribute = ElementExplorer.filterByAttribute(parentElement, 'data-type', 'exampleValue');
     *
     * @output {Array<HTMLElement>} - An array of descendants with the specified attribute and value.
     *
     * @description
     * This method filters the descendants of the provided HTML element based on the specified attribute and its value.
     * If the 'element' parameter is not an object, the 'attribute' parameter is not a string, the 'value' parameter is not a string, or 'element' is not provided, it returns an empty array.
     * If throwOnError is true and 'element', 'attribute', or 'value' is not provided or is not of the expected type, it throws an error.
     */
    static filterByAttribute(element, attribute, value, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: attribute, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: value, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        const descendants = Array.from(element.querySelectorAll(`[${attribute}="${value}"]`));
        return descendants;
    }


    /**
     * Retrieves the position of the provided HTML element among its siblings.
     *
     * @param {HTMLElement} element - The HTML element whose position is to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     * 
     * @return {number|null} - The position of the element among its siblings (zero-based index) or null if the element has no parent.
     * 
     * @throw {Error} - Throws an error if the 'element' parameter is not an object or if 'element' is not provided (when throwOnError is true).
     * 
     * @example
     * // Example usage:
     * // Assuming 'childElement' is an HTML element.
     * // const position = ElementExplorer.getPositionInParent(childElement);
     * 
     * @output {number|null} - The position of the element among its siblings.
     * 
     * @description
     * This method retrieves the position of the provided HTML element among its siblings.
     * If the 'element' parameter is not an object or 'element' is not provided, it returns null.
     * If throwOnError is true and 'element' is not provided or is not of the expected type, it throws an error.
     */
    static getPositionInParent(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }
        if (!element || !element.parentElement) {
            return null;
        }

        const siblings = Array.from(element.parentElement.children);
        return siblings.indexOf(element);
    }


    /**
     * Retrieves the insertion point for a new HTML element relative to its siblings.
     *
     * @param {HTMLElement} element - The HTML element for which the insertion point is to be determined.
     * @param {boolean} [before=true] - If true, retrieves the insertion point before the element; otherwise, retrieves it after the element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     * 
     * @return {number|null} - The insertion point index relative to the element's siblings or null if the element has no parent.
     * 
     * @throw {Error} - Throws an error if the 'element' parameter is not an object, if 'element' is not provided, or if 'before' is not a boolean (when throwOnError is true).
     * 
     * @example
     * // Example usage:
     * // Assuming 'childElement' is an HTML element.
     * // const insertionPoint = ElementExplorer.getInsertionPoint(childElement, true);
     * 
     * @output {number|null} - The insertion point index relative to the element's siblings.
     * 
     * @description
     * This method retrieves the insertion point for a new HTML element relative to its siblings.
     * If the 'element' parameter is not an object, 'element' is not provided, or 'before' is not a boolean, it returns null.
     * If throwOnError is true and 'element' is not provided, is not of the expected type, or 'before' is not a boolean, it throws an error.
     */
    static getInsertionPoint(element, before = true, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })
            || !GET_ELEMENT_VALIDATION.isBoolean({ param: before, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }
        if (!element || !element.parentElement) {
            return null;
        }

        const siblings = Array.from(element.parentElement.children);
        const currentIndex = siblings.indexOf(element);

        return before ? currentIndex : currentIndex + 1;
    }


    /**
     * Adds a delegated event listener to a parent element for the specified event type and target selector.
     *
     * @param {HTMLElement} parentElement - The parent element to attach the event listener to.
     * @param {string} eventType - The type of event to listen for (e.g., 'click', 'change').
     * @param {string} targetSelector - The CSS selector for the target elements within the parent.
     * @param {Function} callback - The function to call when the event occurs on a target element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, logs a warning.
     *
     * @throws {Error} - Throws an error if the 'parentElement', 'eventType', 'targetSelector', or 'callback' parameters are invalid or missing.
     *
     * @example
     * // Example usage:
     * // Assuming 'parentElement' is an HTML element, 'click' is the event type,
     * // '.button' is the target selector, and 'clickHandler' is the callback function.
     * // ElementExplorer.addDelegatedEventListener(parentElement, 'click', 'button', clickHandler);
     *
     * @description
     * This method adds a delegated event listener to a parent element for the specified event type and target selector.
     * The provided callback function is called only when an event occurs on an element matching the target selector within the parent.
     * If throwOnError is true and any parameter is invalid or missing, it throws an error; otherwise, it logs a warning.
     */
    static addDelegatedEventListener(parentElement, eventType, targetSelector, callback, throwOnError = true) {
        // Validation logic
        if (!GET_ELEMENT_VALIDATION.isObject({ param: parentElement, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: eventType, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: targetSelector, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isFunction({ param: callback, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        parentElement.addEventListener(eventType, (event) => {
            const targetElement = event.target.closest(targetSelector);
            if (targetElement) {
                callback(event, targetElement);
            }
        });
    }


    /**
     * Retrieves the path from a given HTML element to a specified ancestor element.
     *
     * @param {HTMLElement} element - The HTML element for which the path is to be retrieved.
     * @param {HTMLElement} ancestor - The ancestor HTML element to which the path is calculated.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns an empty array.
     * 
     * @return {Array<HTMLElement>} - An array containing the HTML elements representing the path from 'element' to 'ancestor'.
     * 
     * @throw {Error} - Throws an error if the 'element' or 'ancestor' parameters are not objects, or if 'element' or 'ancestor' are not provided (when throwOnError is true).
     * 
     * @example
     * // Example usage:
     * // Assuming 'childElement' and 'ancestorElement' are HTML elements.
     * // const pathToAncestor = ElementExplorer.getPathToAncestor(childElement, ancestorElement);
     * 
     * @output {Array<HTMLElement>} - An array of HTML elements representing the path from 'element' to 'ancestor'.
     * 
     * @description
     * This method retrieves the path from a given HTML element to a specified ancestor element.
     * If the 'element' or 'ancestor' parameters are not objects, or 'element' or 'ancestor' are not provided, it returns an empty array.
     * If throwOnError is true and 'element' or 'ancestor' is not provided or is not of the expected type, it throws an error.
     */
    static getPathToAncestor(element, ancestor, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError }) || !GET_ELEMENT_VALIDATION.isObject({ param: ancestor, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        const path = [];
        let currentElement = element;

        while (currentElement && currentElement !== ancestor) {
            path.push(currentElement);
            currentElement = currentElement.parentElement;
        }

        if (currentElement === ancestor) {
            path.push(currentElement);
            return path.reverse();
        } else {
            return [];
        }
    }


    /**
     * Retrieves the closest ancestor of a given HTML element with a specified tag name.
     *
     * @param {HTMLElement} element - The HTML element for which the ancestor is to be retrieved.
     * @param {string} tagName - The tag name of the ancestor to search for.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement|null} - The closest ancestor HTML element with the specified tag name, or null if not found.
     *
     * @throw {Error} - Throws an error if the 'element' parameter is not an object, the 'tagName' parameter is not a string, or if 'element' is not provided (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'childElement' is an HTML element and 'ancestorTag' is the tag name.
     * // const closestAncestorByTag = ElementExplorer.getClosestAncestorByTag(childElement, 'ancestorTag');
     *
     * @output {HTMLElement|null} - The closest ancestor HTML element with the specified tag name, or null if not found.
     *
     * @description
     * This method retrieves the closest ancestor of a given HTML element with a specified tag name.
     * If the 'element' parameter is not an object, the 'tagName' parameter is not a string, or 'element' is not provided, it returns null.
     * If throwOnError is true and 'element' or 'tagName' is not provided or is not of the expected type, it throws an error.
     */
    static getClosestAncestorByTag(element, tagName, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError }) || !GET_ELEMENT_VALIDATION.isString({ param: tagName, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        let currentElement = element.parentElement;

        while (currentElement) {
            if (currentElement.tagName.toLowerCase() === tagName.toLowerCase()) {
                return currentElement;
            }

            currentElement = currentElement.parentElement;
        }

        return null;
    }


    /**
     * Retrieves visible children of the provided HTML element.
     *
     * @param {HTMLElement} element - The HTML element whose visible children are to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns an empty array.
     *
     * @return {Array<HTMLElement>} - An array containing visible children of the specified HTML element.
     *
     * @throw {Error} - Throws an error if the 'element' parameter is not an object or 'element' is not provided (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'parentElement' is an HTML element.
     * // const visibleChildren = ElementExplorer.getVisibleChildren(parentElement);
     *
     * @output {Array<HTMLElement>} - An array containing visible children of the specified HTML element.
     *
     * @description
     * This method retrieves visible children of the provided HTML element.
     * If the 'element' parameter is not an object or 'element' is not provided, it returns an empty array.
     * If throwOnError is true and 'element' is not provided or is not of the expected type, it throws an error.
     */
    static getVisibleChildren(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        const visibleChildren = Array.from(element.children).filter(child => {
            const styles = window.getComputedStyle(child);
            return styles && styles.display !== 'none' && styles.visibility !== 'hidden';
        });

        return visibleChildren;
    }


    /**
     * Retrieves invisible children of the provided HTML element.
     *
     * @param {HTMLElement} element - The HTML element whose invisible children are to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns an empty array.
     *
     * @return {Array<HTMLElement>} - An array containing invisible children of the specified HTML element.
     *
     * @throw {Error} - Throws an error if the 'element' parameter is not an object or 'element' is not provided (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'parentElement' is an HTML element.
     * // const invisibleChildren = ElementExplorer.getInvisibleChildren(parentElement);
     *
     * @output {Array<HTMLElement>} - An array containing invisible children of the specified HTML element.
     *
     * @description
     * This method retrieves invisible children of the provided HTML element.
     * If the 'element' parameter is not an object or 'element' is not provided, it returns an empty array.
     * If throwOnError is true and 'element' is not provided or is not of the expected type, it throws an error.
     */
    static getInvisibleChildren(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'invalid parameters');
        }

        const invisibleChildren = Array.from(element.children).filter(child => {
            const styles = window.getComputedStyle(child);
            return styles && (styles.display === 'none' || styles.visibility === 'hidden');
        });

        return invisibleChildren;
    }


    /**
     * Retrieves the first child element of the provided HTML element based on the specified tag name.
     *
     * @param {HTMLElement} element - The HTML element whose first child is to be retrieved.
     * @param {string} tagName - The tag name of the child element to search for.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement|null} - The first child element with the specified tag name, or null if not found.
     *
     * @throw {Error} - Throws an error if the 'element' parameter is not an object, the 'tagName' parameter is not a string,
     * or if 'element' is not provided (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'parentElement' is an HTML element and 'div' is the tag name.
     * // const firstChildDiv = ElementExplorer.getFirstChildByTag(parentElement, 'div');
     *
     * @output {HTMLElement|null} - The first child element with the specified tag name, or null if not found.
     *
     * @description
     * This method retrieves the first child element of the provided HTML element based on the specified tag name.
     * If the 'element' parameter is not an object, the 'tagName' parameter is not a string, or 'element' is not provided,
     * it returns null. If throwOnError is true and 'element' or 'tagName' is not provided or is not of the expected type,
     * it throws an error.
     */
    static getFirstChildByTag(element, tagName, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: tagName, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Invalid parameters.");
        }

        const children = element.getElementsByTagName(tagName);
        return children.length > 0 ? children[0] : null;
    }


    /**
     * Retrieves the last child element of the provided HTML element based on the specified tag name.
     *
     * @param {HTMLElement} element - The HTML element whose last child is to be retrieved.
     * @param {string} tagName - The tag name of the child element to search for.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement|null} - The last child element with the specified tag name, or null if not found.
     *
     * @throw {Error} - Throws an error if the 'element' parameter is not an object, the 'tagName' parameter is not a string,
     * or if 'element' is not provided (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'parentElement' is an HTML element and 'div' is the tag name.
     * // const lastChildDiv = ElementExplorer.getLastChildByTag(parentElement, 'div');
     *
     * @output {HTMLElement|null} - The last child element with the specified tag name, or null if not found.
     *
     * @description
     * This method retrieves the last child element of the provided HTML element based on the specified tag name.
     * If the 'element' parameter is not an object, the 'tagName' parameter is not a string, or 'element' is not provided,
     * it returns null. If throwOnError is true and 'element' or 'tagName' is not provided or is not of the expected type,
     * it throws an error.
     */
    static getLastChildByTag(element, tagName, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: tagName, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Invalid parameters.");
        }

        const children = element.getElementsByTagName(tagName);
        return children.length > 0 ? children[children.length - 1] : null;
    }


    /**
     * Retrieves the index of the provided HTML element among its parent's children.
     *
     * @param {HTMLElement} child - The HTML element whose index is to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns -1.
     *
     * @return {number} - The index of the provided element among its parent's children, or -1 if it has no parent.
     *
     * @throw {Error} - Throws an error if the 'child' parameter is not an object or 'child' is not provided (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'childElement' is an HTML element.
     * // const index = ElementExplorer.getChildIndex(childElement);
     *
     * @output {number} - The index of the provided element among its parent's children, or -1 if it has no parent.
     *
     * @description
     * This method retrieves the index of the provided HTML element among its parent's children.
     * If the 'child' parameter is not an object or 'child' is not provided, it returns -1.
     * If throwOnError is true and 'child' is not provided or is not of the expected type, it throws an error.
     */
    static getChildIndex(child, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: child, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Invalid parameters.");
        }

        const parent = child.parentElement;
        return parent ? Array.from(parent.children).indexOf(child) : -1;
    }


    /**
     * Swaps the positions of two HTML elements within their common parent.
     *
     * @param {HTMLElement} element1 - The first HTML element to be swapped.
     * @param {HTMLElement} element2 - The second HTML element to be swapped.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
     *
     * @return {boolean} - True if the elements were successfully swapped, false otherwise.
     *
     * @throw {Error} - Throws an error if the 'element1' or 'element2' parameters are not objects, either element has no parent, or the elements are not siblings (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'elementA' and 'elementB' are HTML elements.
     * // const success = ElementExplorer.swapElements(elementA, elementB);
     *
     * @output {boolean} - True if the elements were successfully swapped, false otherwise.
     *
     * @description
     * This method swaps the positions of two HTML elements within their common parent.
     * If the 'element1' or 'element2' parameters are not objects, either element has no parent, or the elements are not siblings, it returns false.
     * If throwOnError is true and any of the above conditions are met, it throws an error.
     */
    static swapElements(element1, element2, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element1, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isObject({ param: element2, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Invalid parameters.");
        }

        const parent = element1.parentElement;
        if (!parent) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Element1 has no parent.");
        }

        const index1 = Array.from(parent.children).indexOf(element1);
        const index2 = Array.from(parent.children).indexOf(element2);

        if (index1 === -1 || index2 === -1) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Elements are not siblings.");
        }

        parent.insertBefore(element1, element2);
        parent.insertBefore(element2, parent.children[index1]);

        return true;
    }


    /**
     * Checks if an HTML element is currently visible on the page.
     *
     * @param {HTMLElement} element - The HTML element to be checked for visibility.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
     *
     * @return {boolean} - True if the element is visible, false otherwise.
     *
     * @throw {Error} - Throws an error if the 'element' parameter is not an object (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'targetElement' is an HTML element.
     * // const isVisible = ElementExplorer.isVisible(targetElement);
     *
     * @output {boolean} - True if the element is visible, false otherwise.
     *
     * @description
     * This method checks if an HTML element is currently visible on the page.
     * If the 'element' parameter is not an object, it returns false.
     * If throwOnError is true and 'element' is not of the expected type, it throws an error.
     */
    static isVisible(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Invalid parameters.");
        }

        const style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden';
    }


    /**
     * Checks if the provided HTML element is invisible based on its CSS styling.
     *
     * @param {HTMLElement} element - The HTML element to check for invisibility.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
     * 
     * @return {boolean} - True if the element is invisible, false otherwise.
     * 
     * @throw {Error} - Throws an error if the 'element' parameter is not an object (when throwOnError is true).
     * 
     * @example
     * // Example usage:
     * // Assuming 'targetElement' is an HTML element.
     * // const isElementInvisible = ElementExplorer.isInvisible(targetElement);
     * 
     * @output {boolean} - True if the element is invisible, false otherwise.
     * 
     * @description
     * This method checks if the provided HTML element is invisible based on its CSS styling.
     * If the 'element' parameter is not an object and throwOnError is true, it throws an error.
     */
    static isInvisible(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Invalid parameters.");
        }

        const style = window.getComputedStyle(element);
        return style.display === 'none' && style.visibility === 'hidden';
    }


    /**
     * Retrieves the computed style of an HTML element.
     *
     * @param {HTMLElement} element - The HTML element whose computed style is to be retrieved.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {CSSStyleDeclaration | null} - The computed style of the element or null if the element is not provided or is not of the expected type.
     *
     * @throw {Error} - Throws an error if the 'element' parameter is not an object (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'targetElement' is an HTML element.
     * // const computedStyle = ElementExplorer.getComputedStyle(targetElement);
     *
     * @output {CSSStyleDeclaration | null} - The computed style of the element or null if the element is not provided or is not of the expected type.
     *
     * @description
     * This method retrieves the computed style of an HTML element.
     * If the 'element' parameter is not an object, it returns null.
     * If throwOnError is true and 'element' is not of the expected type, it throws an error.
     */
    static getComputedStyle(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Invalid parameters.");
        }

        return window.getComputedStyle(element);
    }


    /**
     * Checks if the provided object is an HTML element or document.
     *
     * @param {Object} obj - The object to be checked.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
     *
     * @return {boolean} - True if the object is an HTML element or document, false otherwise.
     *
     * @throw {Error} - Throws an error if the 'obj' parameter is not an object (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'targetObject' is an object.
     * // const isElement = ElementExplorer.isElement(targetObject);
     *
     * @output {boolean} - True if the object is an HTML element or document, false otherwise.
     *
     * @description
     * This method checks if the provided object is an HTML element or document.
     * If the 'obj' parameter is not an object, it returns false.
     * If throwOnError is true and 'obj' is not of the expected type, it throws an error.
     */

    static isElement(obj, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: obj, throwOnError })) {
            return throwOrReturnOnError(throwOnError, "Invalid parameters.");
        }

        return obj instanceof Element || obj instanceof HTMLDocument;
    }


    /**
     * Checks if the provided element is a child of the specified parent element.
     *
     * @param {HTMLElement} child - The child element to be checked.
     * @param {HTMLElement} parent - The parent element to compare against.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
     *
     * @return {boolean} - True if the child is a direct child of the parent, false otherwise.
     *
     * @throw {Error} - Throws an error if the 'child' or 'parent' parameters are not objects (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'childElement' and 'parentElement' are HTML elements.
     * // const isChild = ElementExplorer.isChildOf(childElement, parentElement);
     *
     * @output {boolean} - True if the child is a direct child of the parent, false otherwise.
     *
     * @description
     * This method checks if the provided element is a child of the specified parent element.
     * If the 'child' or 'parent' parameters are not objects, it returns false.
     * If throwOnError is true and 'child' or 'parent' is not of the expected type, it throws an error.
     */
    static isChildOf(child, parent, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: child, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isObject({ param: parent, throwOnError })) {
            return throwOrReturnOnError(throwOnError, "Invalid parameters.");
        }

        return child.parentElement === parent;
    }


    /**
     * Checks if the provided element has any child elements.
     *
     * @param {HTMLElement} element - The element to be checked for child elements.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
     *
     * @return {boolean} - True if the element has child elements, false otherwise.
     *
     * @throw {Error} - Throws an error if the 'element' parameter is not an object (when throwOnError is true).
     *
     * @example
     * // Example usage:
     * // Assuming 'parentElement' is an HTML element.
     * // const hasChildren = ElementExplorer.hasChildren(parentElement);
     *
     * @output {boolean} - True if the element has child elements, false otherwise.
     *
     * @description
     * This method checks if the provided element has any child elements.
     * If the 'element' parameter is not an object, it returns false.
     * If throwOnError is true and 'element' is not of the expected type, it throws an error.
     */
    static hasChildren(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Invalid parameters.");
        }

        return element.children.length > 0;
    }


    /**
     * Logs all the available static functions in the ElementExplorer class to the console.
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
        const functionNames = Object.getOwnPropertyNames(ElementExplorer).filter(name => typeof ElementExplorer[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');

        console.log(`Available functions in ElementExplorer class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
    }
}

export { ElementExplorer };