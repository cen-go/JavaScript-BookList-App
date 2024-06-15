// Book Class: Represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI tasks
class UI {
  static displayBooks() {
    const storedBooks = [
      {
        title: "Book One",
        author: "Socrates",
        isbn: "123123"
      },
      {
        title: "Book Two",
        author: "Zico",
        isbn: "456456"
      }
    ];
    const books = storedBooks;
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById("book-list");
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
    `;
    list.append(tableRow);
  }

  static deleteBook(element) {
    if (element.classList.contains("delete")) {
      element.closest("tr").remove();
    }
  }

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Store Class: Handles storage

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", (event) => {
  // Prevent actual submit
  event.preventDefault();
  //get form values
  const titleInput = document.getElementById("title").value;
  const authorInput = document.getElementById("author").value;
  const isbnInput = document.getElementById("isbn").value;

  // instantiate book and add it to the list
  const book = new Book(titleInput, authorInput, isbnInput);
  UI.addBookToList(book);

  // Clear fields
  UI.clearFields();
});

// Event: Remove a Book

document.getElementById("book-list").addEventListener("click", event => 
  UI.deleteBook(event.target)
);