const myLibrary = [];

// Collects form values, creates Book object, and creates card
function addBookToLibrary() {
    const newTitle = document.querySelector('[name="title"]').value;
    const newAuthor = document.querySelector('[name="author"]').value;
    const newPages = document.querySelector('[name="pages"]').value;
    let newRead = null;
    if (document.querySelector('[name="read"]').checked === false) {
        newRead = 'Not read';
    } else if (document.querySelector('[name="read"]').checked === true) {
        newRead = 'Read';
    }
    const newBook = new Book(newTitle, newAuthor, newPages, newRead);
    myLibrary.push(newBook);
    createCard();
}

// Show modal
const addBookModal = document.querySelector('dialog');
const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', () => {
    addBookModal.showModal();
});

// Submit modal
const submitBookButton = document.querySelector('dialog button');
submitBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
});

// Book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Creates card using last item of myLibrary array
function createCard() {
    const library = document.querySelector('.library');

    const card = document.createElement('div');
    card.classList.add('card');
    library.appendChild(card);
    
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = myLibrary[myLibrary.length - 1].title;
    
    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = myLibrary[myLibrary.length - 1].author;
    
    const read = document.createElement('button');
    read.classList.add('read');
    read.textContent = myLibrary[myLibrary.length - 1].read;
    
    const removeBook = document.createElement('button');
    removeBook.classList.add('remove-book');
    removeBook.textContent = 'Remove';
    
    const cardItems = [title, author, read, removeBook];
    for (item of cardItems) {
        card.appendChild(item);
    } 
}