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
    },
    saveBook(book) {
        fetch("/api/savebook", { 
      
            method: "POST", 
      
            body: JSON.stringify({ 
                title: book.volumeInfo.title, 
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
                imagePath: book.volumeInfo.imageLinks.smallThumbnail,
                bookLink: book.volumeInfo.infoLink
            }), 
      
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        }).then(res => console.log(res))
    }
}