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
    console.log(bookArr)
    if (bookArr.length > 0) {
        bookArr.forEach(book => {
            let cardDiv = helper.createElement('div', ['ui', 'segment'])
            let bookImageContainer = helper.createElement('div', ['image'])
            let bookImage = helper.createElement('img', ['ui', 'small', 'image'], { 'src': book.image })
            bookImageContainer.appendChild(bookImage)
            let contentDiv = document.createElement('div')
            let header = helper.createElement('a', ['header'], { 'href': book.bookLink, 'target': 'blank', 'textContent': book.title })
            contentDiv.appendChild(header)
            contentDiv.appendChild(helper.createAuthors(book.authors))
            if (book.description) {
                shouldBookExpand(book, contentDiv)
            }
            let saveBtn = helper.createElement('button', ['red', 'ui', 'x', 'icon', 'button'], {'textContent': 'Remove Book ', 'id': book._id})
            let saveIcon = helper.createElement('i', ['x', 'icon'])
            saveBtn.addEventListener('click', function() { helper.deleteBook(event.target.getAttribute('id') )})
            saveBtn.appendChild(saveIcon)
            cardDiv.appendChild(bookImageContainer)
            cardDiv.appendChild(contentDiv)
            cardDiv.appendChild(saveBtn)
            cardArea.appendChild(cardDiv)
        })
    }
    else {
        let newMessage = helper.createElement('h5', null, {'textContent': 'You currently have no saved books'})
        cardArea.appendChild(newMessage)
    }
}
// adding a read more or read less button if the character length of the description is over 250
function shouldBookExpand(book, contentDiv) {
    if (book.description.length > 250) {
        let slicedDescription = book.description.slice(0, 251)
        let descriptionDiv = helper.createElement('div', ['description-div']) 
        let read = helper.createElement('span', ['read-more'], {'textContent': 'Read More...', 'data-expand': false })
        read.style.color = 'blue'
        read.style.marginLeft = '5px'
        read.style.cursor = 'pointer'
        let description = helper.createElement('span', ['description'], {'textContent': 'Description ' + slicedDescription})
        read.addEventListener('click', function(e) {
            if (e.target['data-expand']) {
                e.target['data-expand'] = false
                description.textContent = 'Description: ' + slicedDescription
                e.target.textContent = 'Read More...'
            }
            else {
                e.target['data-expand'] = true
                description.textContent = 'Description: ' + book.description
                e.target.textContent = 'Read Less...'
            }
        })
        descriptionDiv.appendChild(description)
        descriptionDiv.appendChild(read)
        contentDiv.appendChild(descriptionDiv)
    }
    else {
        let description = helper.createElement('div', ['description'], {'textContent': 'Description: ' + book.description}) 
        contentDiv.appendChild(description)
    }
}


getBooks()