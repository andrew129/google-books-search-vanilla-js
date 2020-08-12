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
    createAuthors(authorsArr) {
        let authorsDiv = document.createElement('div')
        let authors = document.createElement('span')
        let extraContent = ''
        authorsArr.forEach((author, index) => {
            if (authorsArr.length > 1) {
                if (index === authorsArr.length - 1) {
                    extraContent += author
                }
                else {
                    extraContent += author + ',' + ' '
                }
            }
            else {
                extraContent += author
            }
        })
        authors.textContent = 'Author(s): ' + extraContent
        authorsDiv.appendChild(authors)
        return authorsDiv
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
    },
    deleteBook(id) {
        fetch('/api/savebook/' + id, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            window.location.reload()
        })
    }
}