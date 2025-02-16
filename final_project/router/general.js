const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function findBook( key, userValue) {
  for( book in books ){
    if( books[book][key].toLowerCase() == userValue ){
        return books[book];
    }
    continue
}
  return false;
}

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

    if(!books[isbn] ){
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

    const bookDetails = findBook("author", name);

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
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  try {
    const {title} = await req.params;
    const text = title.split("+").join(" ").toLowerCase();

    const bookDetails = findBook("title", text);

    if( bookDetails ){
      return  res.status(200).json(bookDetails);
      }

    return res.status(404).json(" Book by that title doesnt exist ");
  } catch (error) {
      console.log(error)
      return res.status(500).json({message: "Server error"});
  }
});

//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
  try {
    const {isbn} = await req.params;

    if( !books[isbn] ){
      return  res.status(404).json({message: "Book Doesn't Exist"});
    }

    const reviews = books[isbn].reviews;

    return res.status(200).json( {reviews} );
  } catch (error) {
      console.log(error)
      return res.status(500).json({message: "Server error"});
  }
});

module.exports.general = public_users;
