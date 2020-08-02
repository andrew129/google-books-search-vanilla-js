const searchBtn = document.querySelector('.search')
const inputField = document.querySelector('.input-field')
const bookArea = document.querySelector('.book-area')
const resultDiv = document.querySelector('.result-counter')
const cardArea = document.querySelector('.card-area')

searchBtn.addEventListener('click', function() {
    createCards(inputField.value.trim())
})

function createCards(term) {
    resultDiv.textContent = ''
    cardArea.textContent = ''
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}`)
    .then(res => res.json())
    .then(function(data) {
        console.log(data)
        let arrOfBooks = data.items
        let newP = document.createElement('p')
        newP.textContent = `retrieved ${arrOfBooks.length} books that matched your search`
        resultDiv.appendChild(newP)
        arrOfBooks.forEach(function(book) {
            let cardDiv = createElement('div', ['ui', 'segment'])
            let bookImageContainer = createElement('div', ['image'])
            let bookImage = createElement('img', ['ui', 'small', 'image'], { 'src': book.volumeInfo.imageLinks.smallThumbnail })
            bookImageContainer.appendChild(bookImage)
            let contentDiv = document.createElement('div')
            let header = createElement('a', ['header'], { 'href': book.volumeInfo.infoLink, 'target': 'blank', 'textContent': book.volumeInfo.title })
            contentDiv.appendChild(header)
            contentDiv.appendChild(createAuthors(book.volumeInfo.authors))
            let description = createElement('div', null, {'textContent': book.volumeInfo.description})
            contentDiv.appendChild(description)
            cardDiv.appendChild(bookImageContainer)
            cardDiv.appendChild(contentDiv)
            cardArea.appendChild(cardDiv)
        })
    })
}

function createElement(element, classNames, propertyObj) {
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

function createAuthors(authorsArr) {
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
}

// 91 lines before function