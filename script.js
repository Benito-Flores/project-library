// newBook Object Constructor Function
function newBook(title, author, pages, haveRead, ID) {
  // Prevents constructor from being called without 'new'
  if(!new.target) {
    throw Error("DID NOT USE 'NEW' FOR OBJECT");
  };

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead === true ? "Have read" : "Have not read";
  this.ID = crypto.randomUUID(); // Unique ID for tracking
};

// Add shared method to Book prototype (optional)
newBook.prototype.info = function() {
  return `"The ${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead}."`
};

// Pushes new book into the array, library
function addBookToLibrary(book) {
  library.push(book);
};

// Adds book to the DOM
function printLibrary(book) {
  // Create elements
  const bookTitle = document.createElement("h3");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookReadStatus = document.createElement("p");
  const card = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const readBtn = document.createElement("button");

  // Assigns classes and data attributes
  card.classList.add("card");
  card.dataset.id = book.ID;
  deleteBtn.classList.add("delete-book-btn");
  deleteBtn.dataset.id = book.ID;
  readBtn.classList.add("read-btn");

  // set content
  bookTitle.textContent = `Title: ${book.title}`;
  bookAuthor.textContent = `Author: ${book.author}`;
  bookPages.textContent = `Pages: ${book.pages}`;
  bookReadStatus.textContent = `Read Status: ${book.haveRead}`;
  deleteBtn.textContent = "Delete";
  readBtn.textContent = "Mark as Read";
  
  // builds card
  card.appendChild(bookTitle);
  card.appendChild(bookAuthor);
  card.appendChild(bookPages);
  card.appendChild(bookReadStatus);
  card.appendChild(deleteBtn);

  if(bookReadStatus.textContent === `Read Status: Have not read`) {
    card.appendChild(readBtn);
  };

  cardContainer.appendChild(card);

  // delete book button logic
  deleteBtn.addEventListener("click", () => {
    const id = deleteBtn.dataset.id;
    const index = library.findIndex(book => book.ID === id);
    library.splice(index, 1);
    card.remove();
  });

  // toggles read status on the DOM and array
  readBtn.addEventListener("click", () => {
    bookReadStatus.textContent = "Read Status: Have read";
    book.haveRead = "Have read";
    readBtn.remove(); // removes button after update
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

  // Convert radio value string into boolean
  const haveReadValue = form.elements["haveRead"].value === "true" ? true : false;

  // Create new book and process it
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

// thanks for checking it out!