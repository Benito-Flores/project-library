// newBook Object Constructor
function newBook(title, author, pages, haveRead, ID) {
  if(!new.target) {
    throw Error("DID NOT USE NEW FOR OBJECT");
  };
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead === true ? "have read" : "have not read";
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

// Loops library array and prints each book
function printLibrary(array) {
  const bookTitle = document.createElement("div");
  bookTitle.setAttribute("class", "card");
  bookTitle.textContent = array[bookCount].title;
  cardContainer.appendChild(bookTitle);
};

// Global Variables
let bookCount = 0;

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

  printLibrary(library);

  bookCount++;

  form.reset();
});