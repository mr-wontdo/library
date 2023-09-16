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
    updateLibraryCards();
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
    addBookModal.close();
});

// Book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Creates and updates cards
function updateLibraryCards() {
    const library = document.querySelector('.library');
    library.textContent = '';
    for (book of myLibrary) {
        const card = document.createElement('div');
        card.classList.add('card');
        library.appendChild(card);
        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = book.title;
        const author = document.createElement('div');
        author.classList.add('author');
        author.textContent = book.author;
        const readButton = document.createElement('button');
        readButton.classList.add('read');
        readButton.textContent = book.read;
        const removeBookButton = document.createElement('button');
        removeBookButton.classList.add('remove-book');
        removeBookButton.textContent = 'Remove';
        const cardItems = [title, author, readButton, removeBookButton];
        for (item of cardItems) {
            card.appendChild(item);
        } 
    }
}

// Test codes
createDummyBooks();
updateLibraryCards();
function createDummyBooks() {
    const book1 = new Book('Title 1', 'Author 1', 123, 'Not read');
    const book2 = new Book('Title 2', 'Author 2', 123, 'Not read');
    const book3 = new Book('Title 3', 'Author 3', 123, 'Not read');
    myLibrary.push(book1);
    myLibrary.push(book2);
    myLibrary.push(book3);
}