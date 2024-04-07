import { DomValidator as GET_ELEMENT_VALIDATION } from "../../validation/validation";

/**
 * A class that extends ElementHandler and provides functionality for creating new HTML elements.
 * It includes methods for creating, manipulating, and managing the lifecycle of HTML elements.
 */
class ElementBuilder {

    /**
     * Creates a new HTML element with the specified tag name and sets its inner HTML.
     *
     * @param {string} tagName - The tag name of the element to be created.
     * @param {string} innerHTML - The inner HTML content to be set for the created element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, logs an error and returns.
     * 
     * @return {void} - This function does not return anything.
     * 
     * @throw {Error} - Throws an error if the provided tag name is not a string.
     * 
     * @example
     *  Example usage:
     *  ElementBuilder.createHTML('div', 'hello dany');
     * 
     * @output {void} - This function does not return anything.
     * 
     * @description
     * This function creates a new HTML element with the specified tag name and sets its inner HTML content.
     * If the 'tagName' parameter is not a string, it logs an error (if throwOnError is false) or throws an error.
     */
    static createHTML(tagName, innerHTML, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: tagName, throwOnError })) {
            GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters: "tagName" must be a string.');
            return;
        }

        const element = document.createElement(tagName);
        element.innerHTML = innerHTML;

        return element;
    }


    /**
     * Creates an HTML element with specified tag name, attributes, and innerHTML content.
     *
     * @param {string} tagName - The tag name of the element to be created.
     * @param {Object|null} attributes - Additional attributes to set for the element.
     * @param {string|null} [innerHTML=null] - The innerHTML content for the element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement|null} - The created HTML element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'tagName' parameter is not a string,
     * or if 'innerHTML' is not a string or null.
     *
     * @example
     *  Example usage:
     *  const divElement = ElementBuilder.createElementWithAttributes('div', { id: 'example', class: 'sample' }, 'Hello World!');
     *
     * @output {HTMLElement|null} - The created HTML element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an HTML element with the specified tag name, attributes, and innerHTML content.
     * Returns the created HTML element if successful, or null if an error occurs.
     * Throws an error if the 'tagName' parameter is not a string,
     * or if 'innerHTML' is not a string or null.
     */
    static createElementWithAttributes(tagName, attributes, innerHTML = null, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: tagName, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isObjectOrNull({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isStringOrNull({ param: innerHTML, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const element = document.createElement(tagName);

        if (attributes !== null) {
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        if (innerHTML !== null) {
            element.innerHTML = innerHTML;
        }

        return element;
    }


    /**
 * Appends a child element to a parent element.
 *
 * @param {HTMLElement} parent - The parent element.
 * @param {HTMLElement} child - The child element to be appended.
 * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
 *
 * @return {boolean} - Returns true if the operation is successful; otherwise, false.
 *
 * @throws {Error} - Throws an error if the 'parent' or 'child' parameters are not objects or if 'parent' is not provided (when throwOnError is true).
 *
 * @example
 *  Example usage:
 *  const parentElement = ElementHandler.retrieveElementById('parent');
 *  const childElement = ElementBuilder.createHTML('div', 'hello dany');
 *  ElementBuilder.appendElement(parentElement, childElement);
 *
 * @output {boolean} - Returns true if the operation is successful; otherwise, false.
 *
 * @description
 * This method appends a child element to a parent element. It returns true if the operation is successful; otherwise, false.
 * Throws an error if the 'parent' or 'child' parameters are not objects or if 'parent' is not provided (when throwOnError is true).
 */
    static appendElement(parent, child, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: parent, throwOnError }) || !GET_ELEMENT_VALIDATION.isObject({ param: child, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Invalid parameters: 'parent' and 'child' must be objects.");
        }

        parent.appendChild(child);
        return true;
    }


    /**
     * Prepends a child element to a parent element.
     *
     * @param {HTMLElement} parent - The parent element.
     * @param {HTMLElement} child - The child element to be prepended.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
     *
     * @return {boolean} - Returns true if the operation is successful; otherwise, false.
     *
     * @throws {Error} - Throws an error if the 'parent' or 'child' parameters are not objects or if 'parent' is not provided (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const parentElement =ElementHandler.retrieveElementById('parent');
     *  const childElement = document.createElement('div');
     *  ElementBuilder.prependElement(parentElement, childElement);
     *
     * @output {boolean} - Returns true if the operation is successful; otherwise, false.
     *
     * @description
     * This method prepends a child element to a parent element. It returns true if the operation is successful; otherwise, false.
     * Throws an error if the 'parent' or 'child' parameters are not objects or if 'parent' is not provided (when throwOnError is true).
     */
    static prependElement(parent, child, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: parent, throwOnError }) || !GET_ELEMENT_VALIDATION.isObject({ param: child, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, "Invalid parameters: 'parent' and 'child' must be objects.");
        }

        parent.insertBefore(child, parent.firstChild);
        return true;
    }


    /**
 * Creates a new HTML element with the specified tag name, sets its innerHTML, and appends it to a parent element.
 *
 * @param {string} tagName - The tag name of the element to be created.
 * @param {string} innerHTML - The innerHTML content to be set for the new element.
 * @param {HTMLElement} parent - The parent element to which the new element will be appended.
 * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
 *
 * @return {boolean} - Returns true if the operation is successful; otherwise, false.
 *
 * @throws {Error} - Throws an error if the 'tagName', 'innerHTML', 'parent' parameters are not of the expected type, or if 'parent' is not provided (when throwOnError is true).
 *
 * @example
 *  Example usage:
 *  const parentElement = ElementHandler.retrieveElementById('parent');
 *  ElementBuilder.createAndAppend('div', 'Hello World', parentElement);
 *
 * @output {boolean} - Returns true if the operation is successful; otherwise, false.
 *
 * @description
 * This method creates a new HTML element with the specified tag name, sets its innerHTML, and appends it to a parent element.
 * Returns true if the operation is successful; otherwise, false.
 * Throws an error if the 'tagName', 'innerHTML', 'parent' parameters are not of the expected type, or if 'parent' is not provided (when throwOnError is true).
 */
    static createAndAppend(tagName, innerHTML, parent, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: tagName, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: innerHTML, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isObject({ param: parent, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const element = document.createElement(tagName);
        element.innerHTML = innerHTML;

        return ElementBuilder.appendElement(parent, element, throwOnError);
    }


    /**
     * Creates a new HTML element with the specified tag name, sets its innerHTML, and prepends it to a parent element.
     *
     * @param {string} tagName - The tag name of the element to be created.
     * @param {string} innerHTML - The innerHTML content to be set for the new element.
     * @param {HTMLElement} parent - The parent element to which the new element will be prepended.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
     *
     * @return {boolean} - Returns true if the operation is successful; otherwise, false.
     *
     * @throws {Error} - Throws an error if the 'tagName', 'innerHTML', 'parent' parameters are not of the expected type, or if 'parent' is not provided (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const parentElement = ElementHandler.retrieveElementById('parent');
     *  ElementBuilder.createAndPrepend('div', 'Hello World', parentElement);
     *
     * @output {boolean} - Returns true if the operation is successful; otherwise, false.
     *
     * @description
     * This method creates a new HTML element with the specified tag name, sets its innerHTML, and prepends it to a parent element.
     * Returns true if the operation is successful; otherwise, false.
     * Throws an error if the 'tagName', 'innerHTML', 'parent' parameters are not of the expected type, or if 'parent' is not provided (when throwOnError is true).
     */
    static createAndPrepend(tagName, innerHTML, parent, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: tagName, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: innerHTML, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isObject({ param: parent, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const element = document.createElement(tagName);
        element.innerHTML = innerHTML;

        return ElementBuilder.prependElement(parent, element, throwOnError);
    }


    /**
     * Creates a deep copy (clone) of an HTML element, including all its children.
     *
     * @param {HTMLElement} element - The HTML element to be cloned.
     * @param {boolean} [deep=true] - If true, the clone will include all children and descendants; otherwise, only the element itself will be cloned.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement | null} - The cloned HTML element or null if the operation is unsuccessful.
     *
     * @throws {Error} - Throws an error if the 'element' parameter is not of the expected type (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const originalElement = ElementHandler.retrieveElementById('original');
     *  const clonedElement = ElementBuilder.cloneElement(originalElement);
     *
     * @output {HTMLElement | null} - The cloned HTML element or null if the operation is unsuccessful.
     *
     * @description
     * This method creates a deep copy (clone) of an HTML element, including all its children.
     * If deep is true, the clone will include all children and descendants; otherwise, only the element itself will be cloned.
     * Returns the cloned HTML element or null if the operation is unsuccessful.
     * Throws an error if the 'element' parameter is not of the expected type (when throwOnError is true).
     */
    static cloneElement(element, deep = true, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        return element.cloneNode(deep);
    }


    /**
     * Wraps an HTML element with a new parent element.
     *
     * @param {HTMLElement} element - The HTML element to be wrapped.
     * @param {string} wrapperTagName - The tag name of the new parent element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement | null} - The newly created parent element wrapping the provided HTML element, or null if the operation is unsuccessful.
     *
     * @throws {Error} - Throws an error if the 'element' parameter is not of the expected type, or if the 'wrapperTagName' parameter is not a string (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const originalElement = ElementHandler.retrieveElementById('original');
     *  const wrappedElement = ElementBuilder.wrapElement(originalElement, 'div');
     *
     * @output {HTMLElement | null} - The newly created parent element wrapping the provided HTML element, or null if the operation is unsuccessful.
     *
     * @description
     * This method wraps an HTML element with a new parent element created using the specified tag name.
     * Returns the newly created parent element wrapping the provided HTML element, or null if the operation is unsuccessful.
     * Throws an error if the 'element' parameter is not of the expected type, or if the 'wrapperTagName' parameter is not a string (when throwOnError is true).
     */
    static wrapElement(element, wrapperTagName, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError }) || !GET_ELEMENT_VALIDATION.isString({ param: wrapperTagName, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const wrapperElement = document.createElement(wrapperTagName);
        element.parentNode.replaceChild(wrapperElement, element);
        wrapperElement.appendChild(element);

        return wrapperElement;
    }


    /**
     * Unwraps an HTML element by removing its parent and keeping the child in its place.
     *
     * @param {HTMLElement} element - The HTML element to be unwrapped.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns false.
     *
     * @return {boolean} - True if the element is successfully unwrapped, false otherwise.
     *
     * @throws {Error} - Throws an error if the 'element' parameter is not of the expected type (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const childElement = ElementHandler.retrieveElementById('child');
     *  const success = ElementBuilder.unwrapElement(childElement);
     *
     * @output {boolean} - True if the element is successfully unwrapped, false otherwise.
     *
     * @description
     * This method unwraps an HTML element by removing its parent and keeping the child in its place.
     * Returns true if the element is successfully unwrapped, false otherwise.
     * Throws an error if the 'element' parameter is not of the expected type (when throwOnError is true).
     */
    static unwrapElement(fromElement, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: fromElement, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const parentElement = fromElement.parentElement;
        if (parentElement) {
            while (fromElement.firstChild) {
                parentElement.insertBefore(fromElement.firstChild, fromElement);
            }
            parentElement.removeChild(fromElement);
            return true;
        }

        return false;
    }


    /**
     * Creates an HTML image element with the specified source (src) and optional attributes.
     *
     * @param {string} src - The source URL of the image.
     * @param {Object} [attributes={}] - Optional attributes to be added to the image element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLImageElement|null} - The newly created HTML image element with the specified source and attributes, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'src' parameter is not a string or if the 'attributes' parameter is not an object (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const imageElement = ElementBuilder.createImageElement('path/to/image.jpg', { alt: 'An example image', width: 300, height: 200 });
     *
     * @output {HTMLImageElement|null} - The newly created HTML image element or null if an error occurs.
     *
     * @description
     * This method creates an HTML image element with the specified source (src) and optional attributes.
     * Returns the newly created image element or null if an error occurs.
     * Throws an error if the 'src' parameter is not a string or if the 'attributes' parameter is not an object (when throwOnError is true).
     */
    static createImageElement(src, attributes = {}, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: src, throwOnError }) || !GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const imageElement = document.createElement('img');
        imageElement.src = src;

        Object.entries(attributes).forEach(([key, value]) => {
            imageElement.setAttribute(key, value);
        });

        return imageElement;
    }


    /**
     * Inserts the specified element before the reference element.
     *
     * @param {HTMLElement} elementToInsert - The element to be inserted.
     * @param {HTMLElement} referenceElement - The reference element before which the new element will be inserted.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {boolean|null} - True if the insertion is successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'elementToInsert' or 'referenceElement' parameters are not objects (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const newElement = ElementBuilder.createElement('div');
     *  const referenceElement = ElementHandler.retrieveElementById('referenceElement');
     *  ElementBuilder.insertBefore(newElement, referenceElement);
     *
     * @output {boolean|null} - True if the insertion is successful, or null if an error occurs.
     *
     * @description
     * This method inserts the specified element before the reference element.
     * Returns true if the insertion is successful, or null if an error occurs.
     * Throws an error if the 'elementToInsert' or 'referenceElement' parameters are not objects (when throwOnError is true).
     */
    static insertBefore(elementToInsert, referenceElement, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: elementToInsert, throwOnError }) || !GET_ELEMENT_VALIDATION.isObject({ param: referenceElement, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const parent = referenceElement.parentElement;

        if (!parent) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Reference element has no parent.');
        }

        parent.insertBefore(elementToInsert, referenceElement);
        return true;
    }


    /**
     * Inserts the specified element after the reference element.
     *
     * @param {HTMLElement} elementToInsert - The element to be inserted.
     * @param {HTMLElement} referenceElement - The reference element after which the new element will be inserted.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {boolean|null} - True if the insertion is successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'elementToInsert' or 'referenceElement' parameters are not objects (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const newElement = ElementBuilder.createElement('div');
     *  const referenceElement = ElementHandler.retrieveElementById('referenceElement');
     *  ElementBuilder.insertAfter(newElement, referenceElement);
     *
     * @output {boolean|null} - True if the insertion is successful, or null if an error occurs.
     *
     * @description
     * This method inserts the specified element after the reference element.
     * Returns true if the insertion is successful, or null if an error occurs.
     * Throws an error if the 'elementToInsert' or 'referenceElement' parameters are not objects (when throwOnError is true).
     */
    static insertAfter(elementToInsert, referenceElement, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: elementToInsert, throwOnError }) || !GET_ELEMENT_VALIDATION.isObject({ param: referenceElement, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const parent = referenceElement.parentElement;

        if (!parent) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Reference element has no parent.');
        }

        const nextSibling = referenceElement.nextElementSibling;

        if (nextSibling) {
            parent.insertBefore(elementToInsert, nextSibling);
        } else {
            parent.appendChild(elementToInsert);
        }

        return true;
    }


    /**
     * Replaces an existing element with a new element.
     *
     * @param {HTMLElement} newElement - The new element to replace the existing element.
     * @param {HTMLElement} oldElement - The existing element to be replaced.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {boolean|null} - True if the replacement is successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'newElement' or 'oldElement' parameters are not objects (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const newElement = ElementBuilder.createHTML('div');
     *  const oldElement = ElementHandler.retrieveElementById('oldElement');
     *  ElementBuilder.replaceElement(newElement, oldElement);
     *
     * @output {boolean|null} - True if the replacement is successful, or null if an error occurs.
     *
     * @description
     * This method replaces an existing element with a new element.
     * Returns true if the replacement is successful, or null if an error occurs.
     * Throws an error if the 'newElement' or 'oldElement' parameters are not objects (when throwOnError is true).
     */
    static replaceElement(newElement, oldElement, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: newElement, throwOnError }) || !GET_ELEMENT_VALIDATION.isObject({ param: oldElement, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const parent = oldElement.parentElement;

        if (!parent) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Old element has no parent.');
        }

        parent.replaceChild(newElement, oldElement);
        return true;
    }


    /**
     * Removes all child nodes from an element.
     *
     * @param {HTMLElement} element - The element from which to remove all child nodes.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {boolean|null} - True if the removal of child nodes is successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'element' parameter is not an object (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const parentElement = ElementHandler.retrieveElementById('parentElement');
     *  ElementBuilder.emptyElement(parentElement);
     *
     * @output {boolean|null} - True if the removal of child nodes is successful, or null if an error occurs.
     *
     * @description
     * This method removes all child nodes from the specified element.
     * Returns true if the removal is successful, or null if an error occurs.
     * Throws an error if the 'element' parameter is not an object (when throwOnError is true).
     */
    static emptyElement(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        return true;
    }


    /**
     * Removes an element from the DOM.
     *
     * @param {HTMLElement} element - The element to be removed from the DOM.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {boolean|null} - True if the removal of the element is successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'element' parameter is not an object (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const elementToRemove = ElementHandler.retrieveElementById('elementToRemove');
     *  ElementBuilder.removeElement(elementToRemove);
     *
     * @output {boolean|null} - True if the removal of the element is successful, or null if an error occurs.
     *
     * @description
     * This method removes the specified element from the DOM.
     * Returns true if the removal is successful, or null if an error occurs.
     * Throws an error if the 'element' parameter is not an object (when throwOnError is true).
     */
    static removeElement(element, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: element, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const parent = element.parentElement;

        if (!parent) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Element has no parent.');
        }

        parent.removeChild(element);

        return true;
    }


    /**
     * Creates a text node and appends it to an element.
     *
     * @param {HTMLElement} parentElement - The element to which the text node will be appended.
     * @param {string} text - The text content of the text node.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {Text|null} - The created text node if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'parentElement' parameter is not an object or 'text' parameter is not a string (when throwOnError is true).
     *
     * @example
     *  Example usage:
     *  const parentElement = ElementHandler.retrieveElementById('parentElement');
     *  ElementBuilder.createTextElement(parentElement, 'Hello, World!');
     *
     * @output {Text|null} - The created text node if successful, or null if an error occurs.
     *
     * @description
     * This method creates a text node with the specified text content and appends it to the provided element.
     * Returns the created text node if successful, or null if an error occurs.
     * Throws an error if the 'parentElement' parameter is not an object or 'text' parameter is not a string (when throwOnError is true).
     */
    static createTextElement(parentElement, text, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: parentElement, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: text, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const textNode = document.createTextNode(text);
        parentElement.appendChild(textNode);

        return textNode;
    }


    /**
     * Creates a link element with specified attributes.
     *
     * @param {string} href - The href attribute for the link element.
     * @param {string} innerHTML - The innerHTML text content for the link element.
     * @param {boolean} newTab - If true, opens the link in a new tab; otherwise, opens it in the same tab.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLLinkElement|null} - The created link element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'href' or 'innerHTML' parameters are not strings.
     *
     * @example
     *  Example usage:
     *  const linkElement = DOMCreation.createLinkElement('https://example.com', 'Visit Example', true);
     *
     * @output {HTMLLinkElement|null} - The created link element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a link element with the specified href, innerHTML, and newTab attributes.
     * Returns the created link element if successful, or null if an error occurs.
     * Throws an error if the 'href' or 'innerHTML' parameters are not strings.
     */
    static createLinkElement(href, innerHTML, newTab = true, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: href, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: innerHTML, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const linkElement = document.createElement('a');
        linkElement.href = href;
        linkElement.innerHTML = innerHTML;
        if (newTab) {
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
        }

        return linkElement;
    }


    /**
     * Creates a map element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the map element.
     * @param {string|null} [innerHTML=null] - The innerHTML content for the map element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLMapElement|null} - The created map element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * or if 'innerHTML' is not a string or null.
     *
     * @example
     *  Example usage:
     *  const mapElement = ElementBuilder.createMapElement({ name: 'example-map' });
     *
     * @output {HTMLMapElement|null} - The created map element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a map element with the specified attributes.
     * Returns the created map element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * or if 'innerHTML' is not a string or null.
     */
    static createMapElement(attributes = {}, innerHTML = null, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isStringOrNull({ param: innerHTML, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const mapElement = this.createElementWithAttributes('map', attributes, innerHTML, throwOnError);
        return mapElement;
    }


    /**
     * Creates an <area> element with specified attributes for use in an image map.
     *
     * @param {Object} attributes - Additional attributes to set for the <area> element.
     * @param {string|null} [innerHTML=null] - The innerHTML content for the <area> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLAreaElement|null} - The created <area> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * or if 'innerHTML' is not a string or null.
     *
     * @example
     *  Example usage:
     *  const areaElement = ElementBuilder.createAreaElement({ shape: 'rect', coords: '0,0,50,50', href: 'link1.html' });
     *
     * @output {HTMLAreaElement|null} - The created <area> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an <area> element with the specified attributes for use in an image map.
     * Returns the created <area> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * or if 'innerHTML' is not a string or null.
     */
    static createAreaElement(attributes = {}, innerHTML = null, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isStringOrNull({ param: innerHTML, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const areaElement = this.createElementWithAttributes('area', attributes, innerHTML, throwOnError);
        return areaElement;
    }


    /**
     * Creates a <select> element with specified attributes and options.
     *
     * @param {Object} attributes - Additional attributes to set for the <select> element.
     * @param {Array<Object>} options - An array of option objects, each containing 'value' and 'text' properties.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLSelectElement|null} - The created <select> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * if the 'options' parameter is not an array, or if any option is missing 'value' or 'text' properties.
     *
     * @example
     *  Example usage:
     *  const selectElement = ElementBuilder.createSelectElement(
     *    { id: 'example-select', name: 'example', class: 'custom-select' },
     *    [
     *      { value: 'option1', text: 'Option 1' },
     *      { value: 'option2', text: 'Option 2' },
     *      { value: 'option3', text: 'Option 3' }
     *    ]
     *  );
     *
     * @output {HTMLSelectElement|null} - The created <select> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <select> element with the specified attributes and options.
     * Returns the created <select> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * if the 'options' parameter is not an array, or if any option is missing 'value' or 'text' properties.
     */
    static createSelectElement(attributes = {}, options = [], throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isArray({ param: options, throwOnError }) ||
            options.some(option => !GET_ELEMENT_VALIDATION.isObject({ param: option, throwOnError }) ||
                !GET_ELEMENT_VALIDATION.isString({ param: option.value, throwOnError }) ||
                !GET_ELEMENT_VALIDATION.isString({ param: option.text, throwOnError }))) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const selectElement = this.createElementWithAttributes('select', attributes, null, throwOnError);

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.text = option.text;
            selectElement.appendChild(optionElement);
        });

        return selectElement;
    }


    /**
     * Creates an <option> element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the <option> element.
     * @param {string} text - The text content for the <option> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLOptionElement|null} - The created <option> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * or if the 'text' parameter is not a string.
     *
     * @example
     *  Example usage:
     *  const optionElement = ElementBuilder.createOptionElement(
     *    { value: 'option1', disabled: true },
     *    'Option 1'
     *  );
     *
     * @output {HTMLOptionElement|null} - The created <option> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an <option> element with the specified attributes.
     * Returns the created <option> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * or if the 'text' parameter is not a string.
     */
    static createOptionElement(attributes = {}, text, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: text, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const optionElement = this.createElementWithAttributes('option', attributes, text, throwOnError);
        return optionElement;
    }


    /**
     * Creates an <optgroup> element with specified attributes and child options.
     *
     * @param {Object} attributes - Additional attributes to set for the <optgroup> element.
     * @param {Array<Object>} options - An array of option objects to be included as children of the <optgroup> element.
     * Each option object should have 'attributes' and 'text' properties.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLOptGroupElement|null} - The created <optgroup> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * if the 'options' parameter is not an array of objects with 'attributes' and 'text' properties,
     * or if any option's 'attributes' or 'text' is invalid.
     *
     * @example
     *  Example usage:
     *  const optgroupElement = ElementBuilder.createOptgroupElement(
     *    { label: 'Group 1', disabled: true },
     *    [
     *      { attributes: { value: 'option1', disabled: true }, text: 'Option 1' },
     *      { attributes: { value: 'option2' }, text: 'Option 2' }
     *    ]
     *  );
     *
     * @output {HTMLOptGroupElement|null} - The created <optgroup> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an <optgroup> element with the specified attributes and child options.
     * Returns the created <optgroup> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * if the 'options' parameter is not an array of objects with 'attributes' and 'text' properties,
     * or if any option's 'attributes' or 'text' is invalid.
     */
    static createOptgroupElement(attributes = {}, options = [], throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const optgroupElement = this.createElementWithAttributes('optgroup', attributes, null, throwOnError);

        options.forEach(option => {
            const { attributes: optionAttributes, text: optionText } = option;
            const optionElement = this.createOptionElement(optionAttributes, optionText, throwOnError);
            if (optionElement) {
                optgroupElement.appendChild(optionElement);
            }
        });

        return optgroupElement;
    }


    /**
     * Creates a <textarea> element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the <textarea> element.
     * @param {string|null} [value=null] - The initial value for the <textarea> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLTextAreaElement|null} - The created <textarea> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const textareaElement = ElementBuilder.createTextareaElement({ rows: 4, cols: 50 }, 'Initial value');
     *
     * @output {HTMLTextAreaElement|null} - The created <textarea> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <textarea> element with the specified attributes.
     * Returns the created <textarea> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createTextareaElement(attributes = {}, value = null, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const textareaElement = this.createElementWithAttributes('textarea', attributes, null, throwOnError);

        if (value !== null) {
            textareaElement.value = value;
        }

        return textareaElement;
    }


    /**
     * Creates a <label> element with specified attributes and associated input element.
     *
     * @param {Object} attributes - Additional attributes to set for the <label> element.
     * @param {string|null} [forId=null] - The ID of the associated input element.
     * @param {string|null} [textContent=null] - The text content for the <label> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLLabelElement|null} - The created <label> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const labelElement = ElementBuilder.createLabelElement({ class: 'form-label' }, 'inputId', 'Enter your name:');
     *
     * @output {HTMLLabelElement|null} - The created <label> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <label> element with the specified attributes and associates it with an input element.
     * Returns the created <label> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createLabelElement(attributes = {}, forId = null, textContent = null, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const labelElement = this.createElementWithAttributes('label', attributes, textContent, throwOnError);

        if (forId !== null) {
            labelElement.setAttribute('for', forId);
        }

        return labelElement;
    }


    /**
     * Creates a <fieldset> element with specified attributes and associated legend element.
     *
     * @param {Object} attributes - Additional attributes to set for the <fieldset> element.
     * @param {string|null} [legendText=null] - The text content for the associated <legend> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLFieldSetElement|null} - The created <fieldset> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const fieldsetElement = ElementBuilder.createFieldsetElement({ class: 'form-fieldset' }, 'User Details');
     *
     * @output {HTMLFieldSetElement|null} - The created <fieldset> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <fieldset> element with the specified attributes and associates it with a <legend> element.
     * Returns the created <fieldset> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createFieldsetElement(attributes = {}, legendText = null, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const fieldsetElement = this.createElementWithAttributes('fieldset', attributes, null, throwOnError);

        if (legendText !== null) {
            const legendElement = this.createElementWithAttributes('legend', {}, legendText, throwOnError);
            fieldsetElement.appendChild(legendElement);
        }

        return fieldsetElement;
    }


    /**
     * Creates a legend element with specified text content.
     *
     * @param {string} legendText - The text content for the legend element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLLegendElement|null} - The created legend element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'legendText' parameter is not a string.
     *
     * @example
     *  Example usage:
     *  const legendElement = ElementBuilder.createLegendElement('Form Legend');
     *
     * @output {HTMLLegendElement|null} - The created legend element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a legend element with the specified text content.
     * Returns the created legend element if successful, or null if an error occurs.
     * Throws an error if the 'legendText' parameter is not a string.
     */
    static createLegendElement(legendText, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: legendText, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        return this.createElementWithAttributes('legend', {}, legendText, throwOnError);
    }


    /**
     * Creates a table element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the table element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLTableElement|null} - The created table element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const tableElement = ElementBuilder.createTableElement({ border: '1', cellspacing: '0', cellpadding: '5' });
     *
     * @output {HTMLTableElement|null} - The created table element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a table element with the specified attributes.
     * Returns the created table element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createTableElement(attributes = {}, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        return this.createElementWithAttributes('table', attributes, null, throwOnError);
    }


    /**
     * Creates a table row element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the table row element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLTableRowElement|null} - The created table row element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const rowElement = ElementBuilder.createTableRowElement({ class: 'table-row', 'data-id': '1' });
     *
     * @output {HTMLTableRowElement|null} - The created table row element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a table row element with the specified attributes.
     * Returns the created table row element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createTableRowElement(attributes = {}, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        return this.createElementWithAttributes('tr', attributes, null, throwOnError);
    }


    /**
     * Creates a table head (thead) element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the table head element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLTableSectionElement|null} - The created table head (thead) element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const theadElement = ElementBuilder.createTableHeadElement({ class: 'table-header' });
     *
     * @output {HTMLTableSectionElement|null} - The created table head (thead) element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a table head (thead) element with the specified attributes.
     * Returns the created table head (thead) element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createTableHeadElement(attributes = {}, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        return this.createElementWithAttributes('thead', attributes, null, throwOnError);
    }


    /**
     * Creates a table foot (tfoot) element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the table foot element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLTableSectionElement|null} - The created table foot (tfoot) element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const tfootElement = ElementBuilder.createTableFootElement({ class: 'table-footer' });
     *
     * @output {HTMLTableSectionElement|null} - The created table foot (tfoot) element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a table foot (tfoot) element with the specified attributes.
     * Returns the created table foot (tfoot) element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createTableFootElement(attributes = {}, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        return this.createElementWithAttributes('tfoot', attributes, null, throwOnError);
    }


    /**
     * Creates a form element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the form element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLFormElement|null} - The created form element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const formElement = ElementBuilder.createFormElement({ action: '/submit', method: 'post' });
     *
     * @output {HTMLFormElement|null} - The created form element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a form element with the specified attributes.
     * Returns the created form element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createFormElement(attributes = {}, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const formElement = this.createElementWithAttributes('form', attributes, null, throwOnError);
        return formElement;
    }


    /**
     * Creates an input element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the input element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLInputElement|null} - The created input element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const inputElement = ElementBuilder.createInputElement({ type: 'text', name: 'username', placeholder: 'Enter your username' });
     *
     * @output {HTMLInputElement|null} - The created input element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an input element with the specified attributes.
     * Returns the created input element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createInputElement(attributes = {}, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const inputElement = this.createElementWithAttributes('input', attributes, null, throwOnError);
        return inputElement;
    }


    /**
     * Creates a button element with specified attributes and innerHTML content.
     *
     * @param {Object} attributes - Additional attributes to set for the button element.
     * @param {string|null} innerHTML - The innerHTML content for the button element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLButtonElement|null} - The created button element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * or if 'innerHTML' is not a string or null.
     *
     * @example
     *  Example usage:
     *  const buttonElement = ElementBuilder.createButtonElement({ type: 'button', onclick: 'handleClick()' }, 'Click me');
     *
     * @output {HTMLButtonElement|null} - The created button element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a button element with the specified attributes and innerHTML content.
     * Returns the created button element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * or if 'innerHTML' is not a string or null.
     */
    static createButtonElement(attributes = {}, innerHTML = null, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isStringOrNull({ param: innerHTML, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const buttonElement = this.createElementWithAttributes('button', attributes, innerHTML, throwOnError);
        return buttonElement;
    }


    /**
     * Creates a checkbox input element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the checkbox input element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLInputElement|null} - The created checkbox input element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const checkboxElement = ElementBuilder.createCheckboxElement({ id: 'check', name: 'checkbox' });
     *
     * @output {HTMLInputElement|null} - The created checkbox input element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a checkbox input element (`<input type="checkbox">`) with the specified attributes.
     * Returns the created checkbox input element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createCheckboxElement(attributes = {}, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        attributes.type = 'checkbox'; // Ensure type is set to 'checkbox'
        const checkboxElement = this.createElementWithAttributes('input', attributes, null, throwOnError);
        return checkboxElement;
    }


    /**
     * Creates a radio input element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the radio input element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLInputElement|null} - The created radio input element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     * Example usage:
     * const radioElement = ElementBuilder.createInputRadioElement({ id: 'radio', name: 'radio-group' });
     *
     * @output {HTMLInputElement|null} - The created radio input element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a radio input element (`<input type="radio">`) with the specified attributes.
     * Returns the created radio input element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createInputRadioElement(attributes = {}, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        attributes.type = 'radio'; // Ensure type is set to 'radio'
        const radioElement = this.createElementWithAttributes('input', attributes, null, throwOnError);
        return radioElement;
    }


    /**
     * Creates a list element (ul or ol) with specified attributes and list items.
     *
     * @param {string} listType - The type of list ('ul' for unordered list or 'ol' for ordered list).
     * @param {Object} attributes - Additional attributes to set for the list element.
     * @param {Array} items - An array of objects representing list items with their attributes and text content.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLUListElement|HTMLOListElement|null} - The created list element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'listType', 'attributes', or 'items' parameters are not of the expected types.
     *
     * @example
     *  Example usage:
     *  const unorderedList = ElementBuilder.createListElement('ul', 
     * { class: 'my-list' },
     * [{ text: 'Item 1' }, { text: 'Item 2' }]);
     * 
     * const unorderedList = js.ElementBuilder.createListElement('ul', { class: 'my-list' }, [
     *  { text: 'Item 1', attributes: { 'data-id': '1', 'data-type': 'item' } },
     *  { text: 'Item 2', attributes: { 'data-id': '2', 'data-type': 'item' } }
     *  ]);
     * 
     *  const orderedList = ElementBuilder.createListElement('ol', { start: 3 }, [{ text: 'Item 1' }, { text: 'Item 2' }]);
     *
     * @output {HTMLUListElement|HTMLOListElement|null} - The created list element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a list element (ul or ol) with specified attributes and list items.
     * Returns the created list element if successful, or null if an error occurs.
     * Throws an error if the 'listType', 'attributes', or 'items' parameters are not of the expected types.
     */
    static createListElement(listType, attributes = {}, items = [], throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: listType, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isArrayOfObjects({ param: items, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const listElement = this.createElementWithAttributes(listType, attributes, null, throwOnError);

        items.forEach((item) => {
            const listItemAttributes = item.attributes || {};
            const listItem = this.createElementWithAttributes('li', listItemAttributes, item.text, throwOnError);
            listElement.appendChild(listItem);
        });

        return listElement;
    }


    /**
     * Creates a paragraph element with specified attributes and text content.
     *
     * @param {Object} attributes - Additional attributes to set for the paragraph element.
     * @param {string} textContent - The text content for the paragraph element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLParagraphElement|null} - The created paragraph element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object or if 'textContent' is not a string.
     *
     * @example
     *  Example usage:
     *  const paragraphElement = ElementBuilder.createParagraphElement({ class: 'my-paragraph' }, 'This is a paragraph.');
     *
     * @output {HTMLParagraphElement|null} - The created paragraph element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a paragraph element with the specified attributes and text content.
     * Returns the created paragraph element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object or if 'textContent' is not a string.
     */
    static createParagraphElement(attributes = {}, textContent = '', throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: textContent, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const paragraphElement = this.createElementWithAttributes('p', attributes, textContent, throwOnError);
        return paragraphElement;
    }


    /**
     * Creates a heading element with specified attributes and text content.
     *
     * @param {number} level - The heading level (1 to 6).
     * @param {Object} attributes - Additional attributes to set for the heading element.
     * @param {string} textContent - The text content for the heading element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLHeadingElement|null} - The created heading element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'level' parameter is not a number,
     * if the 'attributes' parameter is not an object, or if 'textContent' is not a string.
     *
     * @example
     *  Example usage:
     *  const headingElement = ElementBuilder.createHeadingElement(2, { class: 'my-heading' }, 'Heading Text');
     *
     * @output {HTMLHeadingElement|null} - The created heading element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a heading element with the specified level, attributes, and text content.
     * Returns the created heading element if successful, or null if an error occurs.
     * Throws an error if the 'level' parameter is not a number,
     * if the 'attributes' parameter is not an object, or if 'textContent' is not a string.
     */
    static createHeadingElement(level, attributes = {}, textContent = '', throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isNumber({ param: level, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: textContent, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        if (level < 1 || level > 6) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid heading level');
        }

        const headingTag = `h${level}`;
        const headingElement = this.createElementWithAttributes(headingTag, attributes, textContent, throwOnError);
        return headingElement;
    }


    /**
     * Creates a span element with specified attributes and text content.
     *
     * @param {Object} attributes - Additional attributes to set for the span element.
     * @param {string} textContent - The text content for the span element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLSpanElement|null} - The created span element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object, or if 'textContent' is not a string.
     *
     * @example
     * Example usage:
     * const spanElement = ElementBuilder.createSpanElement({ class: 'my-span' }, 'Span Text');
     *
     * @output {HTMLSpanElement|null} - The created span element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a span element with the specified attributes and text content.
     * Returns the created span element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object, or if 'textContent' is not a string.
     */
    static createSpanElement(attributes = {}, textContent = '', throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: textContent, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const spanElement = this.createElementWithAttributes('span', attributes, textContent, throwOnError);
        return spanElement;
    }


    /**
     * Creates an HR (horizontal line) element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the HR element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLHRElement|null} - The created HR element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const hrElement = ElementBuilder.createHRLineElement({ class: 'my-hr', size: '2' });
     *
     * @output {HTMLHRElement|null} - The created HR element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an HR (horizontal line) element with the specified attributes.
     * Returns the created HR element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createHRLineElement(attributes = {}, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const hrElement = this.createElementWithAttributes('hr', attributes, null, throwOnError);
        return hrElement;
    }


    /**
     * Creates a <div> element with specified attributes and inner HTML content.
     *
     * @param {Object} attributes - Additional attributes to set for the <div> element.
     * @param {string|null} innerHTML - The inner HTML content for the <div> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLDivElement|null} - The created <div> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * or if 'innerHTML' is not a string or null.
     *
     * @example
     * Example usage:
     * const divElement = ElementBuilder.createDivElement({ id: 'example', class: 'sample' }, 'Hello World!');
     *
     * @output {HTMLDivElement|null} - The created <div> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <div> element with the specified attributes and inner HTML content.
     * Returns the created <div> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * or if 'innerHTML' is not a string or null.
     */
    static createDivElement(attributes = {}, innerHTML = null, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isStringOrNull({ param: innerHTML, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const divElement = this.createElementWithAttributes('div', attributes, innerHTML, throwOnError);
        return divElement;
    }


    /**
     * Creates an HTML element with specified tag name, attributes, and innerHTML content in a given namespace.
     *
     * @param {string} namespaceURI - The namespace URI for the element.
     * @param {string} tagName - The tag name of the element to be created.
     * @param {Object|null} attributes - Additional attributes to set for the element.
     * @param {string|null} [innerHTML=null] - The innerHTML content for the element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement|null} - The created HTML element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'namespaceURI' or 'tagName' parameter is not a string,
     * or if 'innerHTML' is not a string or null.
     *
     * @example
     *  Example usage:
     *  const svgElement = ElementBuilder.createElementWithAttributesNS('http://www.w3.org/2000/svg', 'svg', { width: '100', height: '100' }, '<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />');
     *
     * @output {HTMLElement|null} - The created HTML element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an HTML element with the specified tag name, attributes, and innerHTML content in a given namespace.
     * Returns the created HTML element if successful, or null if an error occurs.
     * Throws an error if the 'namespaceURI' or 'tagName' parameter is not a string,
     * or if 'innerHTML' is not a string or null.
     */
    static _createElementWithAttributesNS(namespaceURI, tagName, attributes, innerHTML = null, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: namespaceURI, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: tagName, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isObjectOrNull({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isStringOrNull({ param: innerHTML, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const element = document.createElementNS(namespaceURI, tagName);

        if (attributes !== null) {
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        if (innerHTML !== null) {
            element.innerHTML = innerHTML;
        }

        return element;
    }


    /**
     * Creates an SVG element with specified attributes and inner content.
     *
     * @param {Object} attributes - Additional attributes to set for the SVG element.
     * @param {string|null} innerContent - The inner content for the SVG element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {SVGSVGElement|null} - The created SVG element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * or if 'innerContent' is not a string or null.
     *
     * @example
     *  Example usage:
     *  const svgElement = ElementBuilder.createSVGElement(
     *  { width: '100', height: '100' },
     *  '<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />'
     * );
     *
     * @output {SVGSVGElement|null} - The created SVG element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an SVG element with the specified attributes and inner content.
     * Returns the created SVG element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * or if 'innerContent' is not a string or null.
     */
    static createSVGElement(attributes = {}, innerContent = null, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isStringOrNull({ param: innerContent, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const svgElement = this._createElementWithAttributesNS('http://www.w3.org/2000/svg', 'svg', attributes, innerContent, throwOnError);
        return svgElement;
    }


    /**
     * Creates an <audio> element with specified attributes and source elements.
     *
     * @param {Object} attributes - Additional attributes to set for the <audio> element.
     * @param {Array<Object>} sources - An array of source elements with attributes for the <audio> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLAudioElement|null} - The created <audio> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object or if 'sources' is not an array of objects.
     *
     * @example
     *  Example usage:
     *  const audioElement = ElementBuilder.createAudioElement(
     *    { controls: true },
     *    [
     *      { src: 'audio.mp3', type: 'audio/mp3' },
     *      { src: 'audio.ogg', type: 'audio/ogg' }
     *    ]
     *  );
     *
     * @output {HTMLAudioElement|null} - The created <audio> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an <audio> element with the specified attributes and source elements.
     * Returns the created <audio> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object or if 'sources' is not an array of objects.
     */
    static createAudioElement(attributes, sources, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isArrayOfObjects({ param: sources, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const audioElement = document.createElement('audio');

        // Set attributes for the audio element
        Object.entries(attributes).forEach(([key, value]) => {
            audioElement.setAttribute(key, value);
        });

        // Add source elements to the audio element
        sources.forEach(source => {
            const sourceElement = document.createElement('source');
            Object.entries(source).forEach(([key, value]) => {
                sourceElement.setAttribute(key, value);
            });
            audioElement.appendChild(sourceElement);
        });

        return audioElement;
    }


    /**
     * Creates a <video> element with specified attributes and source elements.
     *
     * @param {Object} attributes - Additional attributes to set for the <video> element.
     * @param {Array<Object>} sources - An array of source elements with attributes for the <video> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLVideoElement|null} - The created <video> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object or if 'sources' is not an array of objects.
     *
     * @example
     *  Example usage:
     *  const videoElement = ElementBuilder.createVideoElement(
     *    { controls: true, width: '640', height: '360' },
     *    [
     *      { src: 'video.mp4', type: 'video/mp4' },
     *      { src: 'video.webm', type: 'video/webm' }
     *    ]
     *  );
     *
     * @output {HTMLVideoElement|null} - The created <video> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <video> element with the specified attributes and source elements.
     * Returns the created <video> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object or if 'sources' is not an array of objects.
     */
    static createVideoElement(attributes, sources, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isArrayOfObjects({ param: sources, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const videoElement = document.createElement('video');

        // Set attributes for the video element
        Object.entries(attributes).forEach(([key, value]) => {
            videoElement.setAttribute(key, value);
        });

        // Add source elements to the video element
        sources.forEach(source => {
            const sourceElement = document.createElement('source');
            Object.entries(source).forEach(([key, value]) => {
                sourceElement.setAttribute(key, value);
            });
            videoElement.appendChild(sourceElement);
        });

        return videoElement;
    }


    /**
     * Creates a <canvas> element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the <canvas> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLCanvasElement|null} - The created <canvas> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const canvasElement = ElementBuilder.createCanvasElement({ width: 800, height: 600 });
     *
     * @output {HTMLCanvasElement|null} - The created <canvas> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <canvas> element with the specified attributes.
     * Returns the created <canvas> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createCanvasElement(attributes, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const canvasElement = document.createElement('canvas');

        Object.entries(attributes).forEach(([key, value]) => {
            canvasElement.setAttribute(key, value);
        });

        return canvasElement;
    }


    /**
     * Creates an <iframe> element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the <iframe> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLIFrameElement|null} - The created <iframe> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const iframeElement = ElementBuilder.createIframeElement({ src: 'https://example.com', width: 800, height: 600 });
     *
     * @output {HTMLIFrameElement|null} - The created <iframe> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an <iframe> element with the specified attributes.
     * Returns the created <iframe> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createIframeElement(attributes, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const iframeElement = document.createElement('iframe');

        // Set attributes for the iframe element
        Object.entries(attributes).forEach(([key, value]) => {
            iframeElement.setAttribute(key, value);
        });

        return iframeElement;
    }


    /**
     * Creates a <footer> element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the <footer> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement|null} - The created <footer> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const footerElement = ElementBuilder.createFooterElement({ class: 'footer', id: 'footer1' });
     *
     * @output {HTMLElement|null} - The created <footer> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <footer> element with the specified attributes.
     * Returns the created <footer> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createFooterElement(attributes, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const footerElement = this.createElementWithAttributes('footer', attributes, null, throwOnError);
        return footerElement;
    }


    /**
     * Creates a <section> element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the <section> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement|null} - The created <section> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     * Example usage:
     * const sectionElement = ElementBuilder.createSectionElement({ class: 'main-section', id: 'section1' });
     *
     * @output {HTMLElement|null} - The created <section> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <section> element with the specified attributes.
     * Returns the created <section> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createSectionElement(attributes, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const sectionElement = this.createElementWithAttributes('section', attributes, null, throwOnError);
        return sectionElement;
    }


    /**
     * Creates an <article> element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the <article> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement|null} - The created <article> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object.
     *
     * @example
     *  Example usage:
     *  const articleElement = ElementBuilder.createArticleElement({ class: 'blog-post', id: 'post1' });
     *
     * @output {HTMLElement|null} - The created <article> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates an <article> element with the specified attributes.
     * Returns the created <article> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object.
     */
    static createArticleElement(attributes, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const articleElement = this.createElementWithAttributes('article', attributes, null, throwOnError);
        return articleElement;
    }


    /**
     * Creates a <time> element with specified attributes and text content.
     *
     * @param {Object} attributes - Additional attributes to set for the <time> element.
     * @param {string} dateTime - The value for the 'datetime' attribute of the <time> element.
     * @param {string} textContent - The text content for the <time> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLElement|null} - The created <time> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object, or if 'dateTime' or 'textContent' is not a string.
     *
     * @example
     *  Example usage:
     *  const timeElement = ElementBuilder.createTimeElement({ class: 'event-time' }, '2024-02-14T12:00:00', '12:00 PM');
     *
     * @output {HTMLElement|null} - The created <time> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <time> element with the specified attributes, 'datetime' value, and text content.
     * Returns the created <time> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object, or if 'dateTime' or 'textContent' is not a string.
     */
    static createTimeElement(attributes, dateTime, textContent, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: dateTime, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: textContent, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const timeElement = this.createElementWithAttributes('time', attributes, textContent, throwOnError);
        timeElement.setAttribute('datetime', dateTime);

        return timeElement;
    }


    /**
     * Creates a <progress> element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the <progress> element.
     * @param {number} value - The initial value for the 'value' attribute of the <progress> element.
     * @param {number} max - The maximum value for the 'max' attribute of the <progress> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLProgressElement|null} - The created <progress> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * or if 'value' or 'max' is not a number.
     *
     * @example
     *  Example usage:
     *  const progressElement = ElementBuilder.createProgressElement({ class: 'loading-bar' }, 50, 100);
     *
     * @output {HTMLProgressElement|null} - The created <progress> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <progress> element with the specified attributes, initial value, and maximum value.
     * Returns the created <progress> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * or if 'value' or 'max' is not a number.
     */
    static createProgressElement(attributes, value, max, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: value, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: max, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const progressElement = this.createElementWithAttributes('progress', attributes, null, throwOnError);
        progressElement.value = value;
        progressElement.max = max;

        return progressElement;
    }


    /**
 * Creates a <meter> element with specified attributes.
 *
 * @param {Object} attributes - Additional attributes to set for the <meter> element.
 * @param {number} value - The initial value for the 'value' attribute of the <meter> element.
 * @param {number} min - The minimum value for the 'min' attribute of the <meter> element.
 * @param {number} max - The maximum value for the 'max' attribute of the <meter> element.
 * @param {number} low - The 'low' value for the <meter> element.
 * @param {number} high - The 'high' value for the <meter> element.
 * @param {number} optimum - The 'optimum' value for the <meter> element.
 * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
 *
 * @return {HTMLMeterElement|null} - The created <meter> element if successful, or null if an error occurs.
 *
 * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
 * or if 'value', 'min', 'max', 'low', 'high', or 'optimum' is not a number.
 *
 * @example
 *  Example usage:
 *  const meterElement = ElementBuilder.createMeterElement({ class: 'power-meter' }, 75, 0, 100, 25, 50, 75);
 *
 * @output {HTMLMeterElement|null} - The created <meter> element if successful, or null if an error occurs.
 *
 * @description
 * This method creates a <meter> element with the specified attributes,
 * initial value, minimum value, maximum value, 'low', 'high', and 'optimum' values.
 * Returns the created <meter> element if successful, or null if an error occurs.
 * Throws an error if the 'attributes' parameter is not an object,
 * or if 'value', 'min', 'max', 'low', 'high', or 'optimum' is not a number.
 */
    static createMeterElement(attributes, value, min, max, low, high, optimum, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: value, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: min, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: max, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: low, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: high, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isNumber({ param: optimum, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const meterElement = this.createElementWithAttributes('meter', attributes, null, throwOnError);
        meterElement.value = value;
        meterElement.min = min;
        meterElement.max = max;
        meterElement.low = low;
        meterElement.high = high;
        meterElement.optimum = optimum;

        return meterElement;
    }


    /**
     * Creates a <details> element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the <details> element.
     * @param {boolean} [open=false] - If true, the <details> element will be open; otherwise, it will be closed.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLDetailsElement|null} - The created <details> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * or if 'open' is not a boolean.
     *
     * @example
     *  Example usage:
     *  const detailsElement = ElementBuilder.createDetailsElement({ class: 'info-box' }, true);
     *
     * @output {HTMLDetailsElement|null} - The created <details> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <details> element with the specified attributes and open state.
     * Returns the created <details> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * or if 'open' is not a boolean.
     */
    static createDetailsElement(attributes, open = false, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isBoolean({ param: open, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const detailsElement = this.createElementWithAttributes('details', attributes, null, throwOnError);
        detailsElement.open = open;

        return detailsElement;
    }


    /**
     * Creates a <summary> element with specified attributes and text content.
     *
     * @param {Object} attributes - Additional attributes to set for the <summary> element.
     * @param {string} text - The text content for the <summary> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLSummaryElement|null} - The created <summary> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * or if the 'text' parameter is not a string.
     *
     * @example
     * Example usage:
     * const summaryElement = ElementBuilder.createSummaryElement({ class: 'section-header' }, 'Section Title');
     *
     * @output {HTMLSummaryElement|null} - The created <summary> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <summary> element with the specified attributes and text content.
     * Returns the created <summary> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * or if the 'text' parameter is not a string.
     */
    static createSummaryElement(attributes, text, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: text, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const summaryElement = this.createElementWithAttributes('summary', attributes, text, throwOnError);

        return summaryElement;
    }


    /**
     * Creates a <datalist> element with specified attributes and option elements.
     *
     * @param {Object} attributes - Additional attributes to set for the <datalist> element.
     * @param {Array} options - An array of objects representing option elements with attributes and text content.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLDataListElement|null} - The created <datalist> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * if the 'options' parameter is not an array of objects,
     * or if any option object has invalid attributes.
     *
     * @example
     *  Example usage:
     *  const dataListElement = ElementBuilder.createDatalistElement(
     *    { id: 'colors' },
     *    [
     *      { value: 'red', label: 'Red' },
     *      { value: 'green', label: 'Green' },
     *      { value: 'blue', label: 'Blue' }
     *    ]
     *  );
     *
     * @output {HTMLDataListElement|null} - The created <datalist> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <datalist> element with the specified attributes and option elements.
     * Returns the created <datalist> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * if the 'options' parameter is not an array of objects,
     * or if any option object has invalid attributes.
     */
    static createDatalistElement(attributes, options, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isArrayOfObjects({ param: options, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const dataListElement = this.createElementWithAttributes('datalist', attributes, null, throwOnError);

        options.forEach((option) => {
            const { value, label } = option;
            if (GET_ELEMENT_VALIDATION.isObject({ param: option, throwOnError })) {
                const optionElement = this.createElementWithAttributes('option', { value, label }, null, throwOnError);
                dataListElement.appendChild(optionElement);
            }
        });

        return dataListElement;
    }


    /**
     * Creates a <script> element with specified attributes and content.
     *
     * @param {Object} attributes - Additional attributes to set for the <script> element.
     * @param {string} content - The content (JavaScript code) to be included in the <script> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLScriptElement|null} - The created <script> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object,
     * if the 'content' parameter is not a string,
     * or if the 'attributes' object contains invalid attributes.
     *
     * @example
     *  Example usage:
     *  const scriptElement = ElementBuilder.createScriptElement(
     *    { src: 'script.js', type: 'text/javascript' },
     *    'console.log("Hello, world!");'
     *  );
     *
     * @output {HTMLScriptElement|null} - The created <script> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <script> element with the specified attributes and content.
     * Returns the created <script> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object,
     * if the 'content' parameter is not a string,
     * or if the 'attributes' object contains invalid attributes.
     */
    static createScriptElement(attributes, content, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError }) ||
            !GET_ELEMENT_VALIDATION.isString({ param: content, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const scriptElement = this.createElementWithAttributes('script', attributes, null, throwOnError);
        scriptElement.textContent = content;

        return scriptElement;
    }


    /**
     * Creates a <meta> element with specified attributes.
     *
     * @param {Object} attributes - Additional attributes to set for the <meta> element.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {HTMLMetaElement|null} - The created <meta> element if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'attributes' parameter is not an object
     * or if the 'attributes' object contains invalid attributes.
     *
     * @example
     *  Example usage:
     *  const metaElement = ElementBuilder.createMetaElement({ charset: 'UTF-8' });
     *
     * @output {HTMLMetaElement|null} - The created <meta> element if successful, or null if an error occurs.
     *
     * @description
     * This method creates a <meta> element with the specified attributes.
     * Returns the created <meta> element if successful, or null if an error occurs.
     * Throws an error if the 'attributes' parameter is not an object
     * or if the 'attributes' object contains invalid attributes.
     */
    static createMetaElement(attributes, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isObject({ param: attributes, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        const metaElement = this.createElementWithAttributes('meta', attributes, null, throwOnError);
        return metaElement;
    }


    /**
     * Creates a comment node with specified text content.
     *
     * @param {string} text - The text content of the comment node.
     * @param {boolean} [throwOnError=true] - If true, throws an error for invalid parameters; otherwise, returns null.
     *
     * @return {Comment|null} - The created comment node if successful, or null if an error occurs.
     *
     * @throws {Error} - Throws an error if the 'text' parameter is not a string.
     *
     * @example
     *  Example usage:
     *  const commentNode = ElementBuilder.createCommentNode('This is a comment.');
     *
     * @output {Comment|null} - The created comment node if successful, or null if an error occurs.
     *
     * @description
     * This method creates a comment node with the specified text content.
     * Returns the created comment node if successful, or null if an error occurs.
     * Throws an error if the 'text' parameter is not a string.
     */
    static createCommentNode(text, throwOnError = true) {
        if (!GET_ELEMENT_VALIDATION.isString({ param: text, throwOnError })) {
            return GET_ELEMENT_VALIDATION.throwOrReturnOnError(throwOnError, 'Invalid parameters');
        }

        return document.createComment(text);
    }


    /**
     * Logs all the available static functions in the ElementBuilder class to the console.
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
        const functionNames = Object.getOwnPropertyNames(ElementBuilder).filter(name => typeof ElementBuilder[name] === 'function' && name !== 'length' && name !== 'name' && name !== 'prototype');

        console.log(`Available static functions in ElementBuilder class:`);
        functionNames.forEach(name => console.log(`- ${name}`));
    }


}

export { ElementBuilder };


