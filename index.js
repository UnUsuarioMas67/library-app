const myLibrary = [
  new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 500, false),
  new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 500, true),
];

function Book(title, author, pages, finished) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.finished = finished;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const tableBody = document.querySelector("tbody");

function displayBooksFromLibrary() {
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
  //   <td class="pages">500</td>
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
  img.src = ""

  thumbnailCell.appendChild(img);

  // Title
  const titleCell = document.createElement("td");
  titleCell.classList.add("title");
  titleCell.textContent = book.title;

  // Author
  const authorCell = document.createElement("td");
  authorCell.classList.add("author");
  authorCell.textContent = book.author;

  // Pages
  const pagesCell = document.createElement("td");
  pagesCell.classList.add("pages");
  pagesCell.textContent = book.pages;

  // Toggle Read Button
  const readCell = document.createElement("td");
  const readBtn = document.createElement("button");
  readBtn.classList.add("read-btn");
  readBtn.textContent = book.finished ? "Read" : "Not Read";

  readCell.appendChild(readBtn);

  // Delete Butotn
  const deleteCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "X";

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

window.addEventListener("load", displayBooksFromLibrary);
addBtn.addEventListener("click", () => {
  dialog.showModal();
});
