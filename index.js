const myLibrary = [
  new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 500, false),
  new Book("Atomic Habits", "James Clear", 320, true),
];

function Book(title, author, pageCount, finished) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.finished = finished;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooksFromLibrary();
}

function deleteBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  displayBooksFromLibrary();
}

function toggleBookReadStatus(bookIndex, btn) {
  myLibrary[bookIndex].finished = !myLibrary[bookIndex].finished;
  btn.classList.toggle("not-read");
  btn.textContent = myLibrary[bookIndex].finished ? "Read" : "Unread";
}

const tableBody = document.querySelector("tbody");

function displayBooksFromLibrary() {
  tableBody.textContent = "";

  myLibrary.forEach((book, index) => {
    tableBody.appendChild(createTableRowFromBook(book, index));
  });
}

function createTableRowFromBook(book, index) {
  // <tr data-index="1">
  //   <td class="thumbnail">
  //     <img src="https://upload.wikimedia.org/wikipedia/en/8/8e/The_Fellowship_of_the_Ring_cover.gif" alt=""
  //       width="128">
  //   </td>
  //   <td class="title">The Fellowship of the Ring</td>
  //   <td class="author">J.R.R. Tolkien</td>
  //   <td class="page-count">500</td>
  //   <td>
  //     <button class="read-btn">Not Read</button>
  //   </td>
  //   <td>
  //     <button class="delete-btn">X</button>
  //   </td>
  // </tr>

  const tableRow = document.createElement("tr");
  tableRow.dataset.index = index;

  // Thumbnail
  const thumbnailCell = document.createElement("td");
  thumbnailCell.classList.add("thumbnail");

  const img = document.createElement("img");
  img.width = 64;
  img.src = "assets/images/Buecher-coloured.svg";

  thumbnailCell.appendChild(img);

  // Title
  const titleCell = document.createElement("td");
  titleCell.classList.add("title");
  titleCell.textContent = book.title;

  // Author
  const authorCell = document.createElement("td");
  authorCell.classList.add("author");
  authorCell.textContent = book.author;

  // Page Count
  const pagesCell = document.createElement("td");
  pagesCell.classList.add("page-count");
  pagesCell.textContent = book.pageCount;

  // Toggle Read Button
  const readCell = document.createElement("td");
  const readBtn = document.createElement("button");
  readBtn.classList.add("read-btn");
  if (!book.finished) {
    readBtn.classList.add("not-read");
  }
  readBtn.textContent = book.finished ? "Read" : "Unread";
  readBtn.addEventListener("click", () => {
    toggleBookReadStatus(index, readBtn);
  });

  readCell.appendChild(readBtn);

  // Delete Butotn
  const deleteCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  const deleteIcon = document.createElement("img");

  deleteIcon.src = "assets/icons/window-close.svg";
  deleteIcon.width = 32;
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteBookFromLibrary(index);
  });

  deleteBtn.appendChild(deleteIcon);
  deleteCell.appendChild(deleteBtn);

  // END

  tableRow.appendChild(thumbnailCell);
  tableRow.appendChild(titleCell);
  tableRow.appendChild(authorCell);
  tableRow.appendChild(pagesCell);
  tableRow.appendChild(readCell);
  tableRow.appendChild(deleteCell);

  return tableRow;
}

const dialog = document.querySelector("dialog");
const addBtn = document.querySelector("#add-btn");
const form = document.querySelector("form");
const closeBtn = document.querySelector("#close-btn");

window.addEventListener("load", displayBooksFromLibrary);

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", () => {
  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#page-count");
  const finishedInput = document.querySelector("#finished");

  const title = titleInput.value;
  const author = authorInput.value;
  const pageCount = pagesInput.value;
  const finished = finishedInput.checked;

  const book = new Book(title, author, pageCount, finished);

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  finishedInput.checked = false;

  addBookToLibrary(book);
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});
