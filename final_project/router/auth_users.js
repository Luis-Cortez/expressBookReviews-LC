const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const secret = "notreallyasecret";
const {userNameExist} = require("./helpers.js")

let users = [{username:"luis", password:"12345"}];


const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  if( username.trim() == "" || username.length < 4 ){
        return false;
  }

  if( userNameExist(username, users) ){
    return false
  }

  return true;
}

const authenticatedUser = (username , password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  for( let  i = 0; i < users.length; i++){
    const user = users[i];
    if( user.username == username && user.password == password){
      return true;
    }
  }

  return false;
}

//only registered users can login
regd_users.post("/login", async (req,res) => {
  //Write your code here
  try {
    const {username, password } = await req.body;
    const userIsValid = authenticatedUser( username, password);
    if( !userIsValid){
      return res.status(401).json({message: "Invalid username or password"});
    }
    const token = jwt.sign( {username} , secret )
    return res.status(200).json({message: "Bearer "+token});

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "server error"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  //Write your code 
  try {
    const token = await req.headers.authorization;
    const {review} = req.body;
    const {isbn} = await req.params;
    const tokenValue = token.slice(7, token.length);
    const {username} = jwt.verify( tokenValue, secret );
    
    if( !books[isbn] || !review ) {
      return res.json({mesage:"Missing information"}).status(404)
    }
    const book = books[isbn]; 
    

    for( Review in books.reviews ){
      if( Review[username] ){
        Review[username] = review;
        return res.json(book.reviews).status(200)
      }
      continue
    }

    book.reviews[username] = review ;
    return res.json(book.reviews).status(200);

    } catch (error) {
      console.log(error)
      return res.json({message:error}).status(500)
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
