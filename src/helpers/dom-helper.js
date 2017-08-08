
const hasAttributeOfValue = (element, attrName, attrValue) => {
    if (element.getAttribute(attrName) === attrValue) return true;
    if (!element.parentElement) return false;
    return hasAttributeOfValue(element.parentElement, attrName, attrValue);
}

export const isEventType = (element, attrValue) =>
    hasAttributeOfValue(element, 'data-event', attrValue)