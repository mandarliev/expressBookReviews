const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  res.send(JSON.stringify({ books }, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  let isbn = req.params.isbn;
  let filter_books = books[isbn];
  res.send(filter_books);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  let author = req.params.author;
  let filtered_author = Object.values(books).filter(
    (book) => book.author === author
  );
  res.send(filtered_author);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  let input = req.params.title;
  let filtered_title = Object.values(books).filter(
    (book) => book.title.split(" ")[0] === input
  );
  res.send(filtered_title);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  let input = req.params.isbn;
  let filter_review = Object.values(books).filter(
    (book) => book.reviews === input
  );
  res.send(filter_review);
});

module.exports.general = public_users;
