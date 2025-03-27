// newBook Object Constructor
function newBook(title, author, pages, haveRead, ID) {
  if(!new.target) {
    throw Error("DID NOT USE NEW FOR OBJECT");
  };
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead === true ? "Have read" : "Have not read";
  this.ID = crypto.randomUUID();
};

// Add shared method to Book prototype
newBook.prototype.info = function() {
  return `"The ${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead}."`
};

// Pushes new book into the array, library
function addBookToLibrary(book) {
  library.push(book);
};

// Adds book to the DOM
function printLibrary(book) {
  const bookTitle = document.createElement("h3");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookReadStatus = document.createElement("p");
  const card = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const readBtn = document.createElement("button");

  card.classList.add("card");
  deleteBtn.classList.add("delete-book-btn");
  readBtn.classList.add("read-btn");
  readBtn.textContent = "Mark as Read";
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset.id = book.ID;
  card.dataset.id = book.ID;
  bookTitle.textContent = `Title: ${book.title}`;
  bookAuthor.textContent = `Author: ${book.author}`;
  bookPages.textContent = `Pages: ${book.pages}`;
  bookReadStatus.textContent = `Read Status: ${book.haveRead}`;
  
  card.appendChild(bookTitle);
  card.appendChild(bookAuthor);
  card.appendChild(bookPages);
  card.appendChild(bookReadStatus);
  card.appendChild(deleteBtn);

  if(bookReadStatus.textContent === `Read Status: Have not read`) {
    card.appendChild(readBtn);
  };

  cardContainer.appendChild(card);

  deleteBtn.addEventListener("click", () => {
    const id = deleteBtn.dataset.id;

    const index = library.findIndex(book => book.ID === id);

    library.splice(index, 1);
    
    card.remove();

  });

  readBtn.addEventListener("click", () => {
    bookReadStatus.textContent = "Read Status: Have read";
    book.haveRead = "Have read";
    readBtn.remove();
  });

};

// Library array
const library = [];

// DOM selectors
const cardContainer = document.querySelector(".card-container");
const addBookBtn = document.querySelector(".add-book-btn");
const form = document.querySelector("form");

// Show form when clicking on Add Book
addBookBtn.addEventListener("click", () => {
  form.classList.add("show-form");
});

form.addEventListener("reset", () => {
  form.classList.remove("show-form");
});

// Submits form and pushes it to library array
form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.classList.remove("show-form");

  const haveReadValue = form.elements["haveRead"].value === "true" ? true : false;

  const book = new newBook(
    form.elements["title"].value,
    form.elements["author"].value,
    form.elements["pages"].value,
    haveReadValue
  );
  addBookToLibrary(book);

  printLibrary(book);

  form.reset();
});