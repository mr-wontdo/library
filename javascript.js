const myLibrary = [];

// Creates Book object from form values, adds to myLibrary array, and updates cards
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
        const readButton = document.createElement('button');
        readButton.classList.add('read');
        readButton.textContent = myLibrary[i].read;
        const removeBookButton = document.createElement('button');
        removeBookButton.classList.add('remove-book');
        removeBookButton.setAttribute('data-index', i)
        removeBookButton.textContent = 'Remove';
        removeBookButton.addEventListener('click', (e) => {
            const indexValue = e.srcElement.getAttribute('data-index');
            myLibrary.splice(indexValue, 1);
            updateLibraryCards();
        });
        const cardItems = [title, author, readButton, removeBookButton];
        for (item of cardItems) {
            card.appendChild(item);
        } 
    }
}