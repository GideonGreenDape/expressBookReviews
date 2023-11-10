const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
if (users.length > 0) {
    const filtered = users.filter((names) => {
        if (names.username === username && names.password===password) {
           return true;
        }
    })
}
else{
    return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username= req.body.username;
  const password= req.body.password;
  req.session.user= username;
  if(username && password){
    if(authenticatedUser(username,password)){
        res.status(300).send('succesfully logged in');
    }
    else{
        res.status(300).send('succesfully logged in');
    }
  }
   else{
    res.status(300).send('input name and password');
   }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const query= req.query.review;
  const ISBN = parseInt(req.params.isbn);
    if (ISBN >= 1 && ISBN <= 10) {
     if(req.session.user && query){
        books[ISBN]["reviews"]=query;
        res.status(300).send('review submitted succesfully');
     }
        else{
            res.status(300).send('book review failed, return to login');
        }
    }
    else {
        return res.status(300).send('This book does not exist')
    }
//   return res.status(300).json({message: "Yet to be implemented"});
});

// deleting a review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const ISBN = parseInt(req.params.isbn);
    if (ISBN >= 1 && ISBN <= 10) {
     if(req.session.user){
        delete books[ISBN]["reviews"];
        res.status(300).send(`review deleted succesfully by ${req.session.user}`);
     }
        else{
            res.status(300).send('review delete failed, return to login');
        }
    }
    else {
        return res.status(300).send('This book does not exist')
    }
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
