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
        console.log(arrOfBooks.length)
        newP.textContent = `retrieved ${arrOfBooks.length} books that matched your search`
        resultDiv.appendChild(newP)
        arrOfBooks.forEach(function(book) {
            let cardDiv = helper.createElement('div', ['ui', 'segment'])
            let bookImageContainer = helper.createElement('div', ['image'])
            let bookImage = helper.createElement('img', ['ui', 'small', 'image'], { 'src': book.volumeInfo.imageLinks.smallThumbnail })
            bookImageContainer.appendChild(bookImage)
            let contentDiv = document.createElement('div')
            let header = helper.createElement('a', ['header'], { 'href': book.volumeInfo.infoLink, 'target': 'blank', 'textContent': book.volumeInfo.title })
            contentDiv.appendChild(header)
            contentDiv.appendChild(helper.createAuthors(book.volumeInfo.authors))
            if (book.volumeInfo.description) {
                let description = helper.createElement('div', null, {'textContent': 'Description: ' + book.volumeInfo.description})
                contentDiv.appendChild(description)
            }
            cardDiv.appendChild(bookImageContainer)
            cardDiv.appendChild(contentDiv)
            createBookMessage(book.volumeInfo.title, cardDiv, book, arrOfBooks)
        })
    })
}

// determining if the book is in the database if so we will create a saved message otherwise a button that allows you to save the book
function createBookMessage(name, cardDiv, book, arrOfBooks) {
    fetch('/api/savebook')
        .then(res => res.json())
        .then(data => {
            const sameBook = data.find(book => book.title === name)
            if (sameBook) {
                let savedMsg = helper.createElement('h4', ['blue', 'ui', 'header'], {'textContent': 'Saved'})
                cardDiv.appendChild(savedMsg)
            }
            else {
                let saveBtn = helper.createElement('button', ['blue', 'ui', 'save', 'icon', 'button'], {'textContent': 'Save Book ', 'id': book.id})
                let saveIcon = helper.createElement('i', ['save', 'icon'])
                saveBtn.addEventListener('click', function() { saveBook(event.target.getAttribute('id'), arrOfBooks, cardDiv )})
                saveBtn.appendChild(saveIcon)
                cardDiv.appendChild(saveBtn)
            }
            cardArea.appendChild(cardDiv)
        })
}


function saveBook(id, bookArr, cardDiv) {
    let saveBtn = document.querySelectorAll('.save')
    console.log(saveBtn)
    saveBtn.forEach(btn => {
        if (btn.getAttribute('id') === id) {
            btn.parentNode.removeChild(btn)
            let newMessage = helper.createElement('h4', ['blue', 'ui', 'header'], {'textContent': 'Saved'})
            cardDiv.appendChild(newMessage)
        }
    })
    const savedBook = bookArr.find(book => book.id === id)
    helper.saveBook(savedBook)
}

