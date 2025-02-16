const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  try {
    return res.status(200).json(books);
  } catch (error) {
    console.log(error)
    return res.status(501);
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const {isbn} = await req.params;

    if(!isbn ||  !books[isbn] ){
      return  res.status(404).json({message: "Book Doesn't Exist"});
    }

    const book = books[isbn];

    return res.status(200).json(book);
  } catch (error) {
      console.log(error)
      return res.status(500).json({message: "Server error"});
  }
  
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  try {
    const {author} = await req.params;
    const name = author.split("+").join(" ").toLowerCase();

    function findAuthor() {
      for( book in books ){
        if( books[book].author.toLowerCase() == name ){
            return books[book];
        }
        continue
    }
      return false;
    }

    const bookDetails = findAuthor();

    if( bookDetails ){
      return  res.status(200).json(bookDetails);
      }

    return res.status(404).json(" Book by that author doesnt exist ");
  } catch (error) {
      console.log(error)
      return res.status(500).json({message: "Server error"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  
});

module.exports.general = public_users;
