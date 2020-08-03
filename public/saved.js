const cardArea = document.querySelector('.book-area')

function getBooks() {
    fetch('/api/savebook')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            createBooks(data)
        })
}

function createBooks(bookArr) {
    bookArr.forEach(book => {
        let cardDiv = helper.createElement('div', ['ui', 'segment'])
        let bookImageContainer = helper.createElement('div', ['image'])
        let bookImage = helper.createElement('img', ['ui', 'small', 'image'], { 'src': book.image })
        bookImageContainer.appendChild(bookImage)
        let contentDiv = document.createElement('div')
        let header = helper.createElement('a', ['header'], { 'href': book.bookLink, 'target': 'blank', 'textContent': book.title })
        contentDiv.appendChild(header)
        contentDiv.appendChild(createAuthors(book.authors))
        let description = helper.createElement('div', ['description'], {'textContent': 'Description: ' + book.description})
        contentDiv.appendChild(description)
        let saveBtn = helper.createElement('button', ['red', 'ui', 'x', 'icon', 'button'], {'textContent': 'Remove Book ', 'id': book.id})
        let saveIcon = helper.createElement('i', ['x', 'icon'])
        saveBtn.addEventListener('click', function() { removeBook(event.target.getAttribute('id'), bookArr )})
        saveBtn.appendChild(saveIcon)
        cardDiv.appendChild(bookImageContainer)
        cardDiv.appendChild(contentDiv)
        cardDiv.appendChild(saveBtn)
        cardArea.appendChild(cardDiv)
    })
}

function removeBook(id, arr) {
    console.log(id)
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

getBooks()