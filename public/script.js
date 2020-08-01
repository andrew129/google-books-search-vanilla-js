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
            let bookCard = document.createElement('div')
            bookCard.classList.add('ui', 'segment')
            let bookImageContainer = document.createElement('div')
            bookImageContainer.classList.add('image')
            let bookImage = document.createElement('img')
            bookImage.classList.add('ui', 'small', 'image')
            bookImage.src = book.volumeInfo.imageLinks.smallThumbnail
            bookImageContainer.appendChild(bookImage)
            let contentDiv = document.createElement('div')
            let header = document.createElement('a')
            header.classList.add('header')
            header.href = book.volumeInfo.infoLink
            header.target = 'blank'
            header.textContent = book.volumeInfo.title
            contentDiv.appendChild(header)
            contentDiv.appendChild(createAuthors(book.volumeInfo.authors))
            let description = document.createElement('div')
            description.textContent = book.volumeInfo.description
            contentDiv.appendChild(description)
            bookCard.appendChild(bookImageContainer)
            bookCard.appendChild(contentDiv)
            cardArea.appendChild(bookCard)
        })
    })
}

function createAuthors(authorsArr) {
    let authorsDiv = document.createElement('div')
    let extraContent = ''
    authorsArr.forEach((author, index) => {
        let authors = document.createElement('span')
        if (authorsArr.length > 1) {
            if (index === authorsArr.length - 1) {
                extraContent = author
            }
            else {
                extraContent = author + ',' + ' '
            }
            authors.textContent = 'Author(s): ' + extraContent
            authorsDiv.appendChild(authors)
        }
        else {
            authors.textContent = 'Author(s): ' + author
            authorsDiv.appendChild(authors)
        }
    })
    return authorsDiv
}