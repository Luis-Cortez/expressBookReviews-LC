const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const {findBook} = require("./helpers");


public_users.post("/register", async (req,res) => {
  try {
    const { username, password } = await req.body;

    if( password.length < 4){
      return res.status(400).json({message: "Password Too short"});
    }

    const userIsValid = isValid( username );

    if( userIsValid  ){
      users.push({username: username, password: password })
      return res.status(200).json({message: "User Created"});
    }
    
    return res.status(400).json({message: "Invalid Username"});

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "server error"});
  }
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    return res.status(200).json(books);
  } catch (error) {
    console.log(error)
    return res.status(501).message(error);
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
    if(name == "unknown"){
      return res.status(404).json(" Author is unknown ");
    }

    const bookDetails = findBook("author", name, books);

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

    const bookDetails = findBook("title", text, books);

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
