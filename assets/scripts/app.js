// Book Class: Represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Store Class: Handles storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// UI Class: Handle UI tasks
class UI {
  static displayBooks() {
    const storedBooks = Store.getBooks();
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

  static ShowAlert(message, className) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${className} mt-4`;
    alertDiv.textContent = message;
    const form = document.getElementById("book-form");
    const submitButton = document.querySelector("#book-form .btn-primary");
    form.insertBefore(alertDiv, submitButton);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}



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

  // Validate
  if (titleInput === "" || authorInput === "" || isbnInput === "") {
    UI.ShowAlert("Please fill in all the fields.", "warning");    
  } else  {
    // instantiate book and add it to the list
    const book = new Book(titleInput, authorInput, isbnInput);
    UI.addBookToList(book);

    // Add book to the Storage
    Store.addBook(book);

    // show success message 
    UI.ShowAlert("Book successfully added.", "success");
  
    // Clear fields
    UI.clearFields();
  }

});

// Event: Remove a Book

document.getElementById("book-list").addEventListener("click", event => {
  UI.deleteBook(event.target)

  // Remove book from storage
  Store.removeBook(event.target.parentElement.previousElementSibling.textContent);

  // show success message 
  UI.ShowAlert("Book deleted.", "info");
}
);