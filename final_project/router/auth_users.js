const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

function userNameExist( username ){
  for( let  i = 0; i < users.length; i++){
    if( users[i].username == username){
      return true;
    }
  }
  return false;
}

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  if( username.trim() == "" || username.length < 4 ){
        return false;
  }

  if( userNameExist(username) ){
    return false
  }

  return true;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  users.forEach( user =>{
    if( user.username == username && user.password == password){
      return true;
    }
  })

  return false;
  
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
