const helper = {
    createElement(element, classNames, propertyObj) {
        let newElement = document.createElement(element)
        if (classNames) {
            classNames.forEach(className => {
                newElement.classList.add(className)
            })
        }
        if (propertyObj) {
            for (key in propertyObj) {
                newElement[key] = propertyObj[key]
            }
        }
        return newElement
    }
}