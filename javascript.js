const myLibrary = [];

// Create book object from form values, add to myLibrary array, and update cards
function addBookToLibrary() {
    const title = document.querySelector('[name="title"]').value;
    const author = document.querySelector('[name="author"]').value;
    const pages = document.querySelector('[name="pages"]').value;
    const isRead = document.querySelector('[name="read"]').checked;
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    updateLibraryCards();
}

// Show modal
const addBookModal = document.querySelector('dialog');
const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', () => {
    addBookModal.showModal();
});

// Submit modal
const modalForm = document.querySelector('form');
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (error.checkFormValidity()) {
        error.showErrors();
    } else {
        addBookToLibrary();
        addBookModal.close();
        modalForm.reset(); 
    };
});

// Book class
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;   
    }
}

// Create and update cards
function updateLibraryCards() {
    const library = document.querySelector('.library');
    library.textContent = '';
    for (let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        library.appendChild(card);

        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = myLibrary[i].title;

        const author = document.createElement('div');
        author.classList.add('author');
        author.textContent = myLibrary[i].author;

        const pages = document.createElement('div');
        pages.classList.add('pages');
        pages.textContent = myLibrary[i].pages + ' pages';

        const readButton = document.createElement('button');
        if (myLibrary[i].isRead === true) {
            readButton.classList.add('read-button', 'is-read');
            readButton.textContent = 'Read';
        } else if (myLibrary[i].isRead === false) {
            readButton.classList.add('read-button', 'not-read');
            readButton.textContent = 'Not read';
        }
        readButton.setAttribute('data-index', i)
        readButton.addEventListener('click', toggleReadStatus);

        const removeBookButton = document.createElement('button');
        removeBookButton.classList.add('remove-book-button');
        removeBookButton.setAttribute('data-index', i)
        removeBookButton.textContent = 'Remove';
        removeBookButton.addEventListener('click', removeCard);

        const cardItems = [title, author, pages, readButton, removeBookButton];
        for (item of cardItems) {
            card.appendChild(item);
        } 
    }
}

// Remove book object from myLibrary array and update cards
function removeCard(e) {
    const indexValue = e.srcElement.getAttribute('data-index');
    myLibrary.splice(indexValue, 1);
    updateLibraryCards();
}

// Toggle read status
function toggleReadStatus(e) {
    e.srcElement.classList.toggle('is-read');
    e.srcElement.classList.toggle('not-read');
    const indexValue = e.srcElement.getAttribute('data-index');
    if (e.srcElement.textContent === 'Read') {
        e.srcElement.textContent = 'Not read';
        myLibrary[indexValue].isRead = false;
    } else if (e.srcElement.textContent === 'Not read') {
        e.srcElement.textContent = 'Read';
        myLibrary[indexValue].isRead = true;
    }
}

// Error handler
function errorHandler() {
    const title = document.querySelector('input[name="title"]');
    const author = document.querySelector('input[name="author"]');
    const pages = document.querySelector('input[name="pages"]');

    function checkFormValidity() {
        if (!title.validity.valid) return true;
        else if (!author.validity.valid) return true;
        else if (!pages.validity.valid) return true;
        else return false;
    }

    function showErrors() {
        showTitleError();
        showAuthorError();
        showPagesError();
    }

    function showTitleError() {
        const titleError = document.querySelector('span.error.title');
        if (title.validity.valueMissing) {
            title.classList.add('invalid');
            titleError.textContent = 'Please enter a title!';
        } else {
            title.classList.remove('invalid');
            titleError.textContent = '';
        }
    }

    function showAuthorError() {
        const authorError = document.querySelector('span.error.author');
        if (author.validity.valueMissing) {
            author.classList.add('invalid');
            authorError.textContent = 'Please enter an author!';
        } else {
            author.classList.remove('invalid');
            authorError.textContent = '';
        }
    }

    function showPagesError() {
        const pagesError = document.querySelector('span.error.pages');
        if (pages.validity.valueMissing) {
            pages.classList.add('invalid');
            pagesError.textContent = 'Please enter the number of pages!';
        } else if (pages.validity.rangeUnderflow) {
            pages.classList.add('invalid');
            pagesError.textContent = 'You can\'t have a negative number of pages!';
        } else {
            pages.classList.remove('invalid');
            pagesError.textContent = '';
        }
    }

    return { checkFormValidity, showErrors };
}

const error = errorHandler();