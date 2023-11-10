const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let store=[];
  const username= req.body.username;
  const password= req.body.password;
  if(username && password){
    if(users.length > 0){
        const filtered= user.filter((names)=>{
     if (names.username===check) {
     res.status(300).send('username is already taken');
  }
  else{
   users.push({
       'username': username,
       'password' : passsword
   });
   res.status(300).send('account registered successfully')
  }
})

    }else{
        res.status(300).send('please input name and passsword correctly')
    }
  }
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).send(JSON.stringify(books,null,10));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const ISBN= parseInt(req.params.isbn);
  if(ISBN>=1 && ISBN<=10){
    return res.status(300).send(JSON.stringify(books[ISBN],null,10))
  }
  else{
    return res.status(300).send('This book does not exist')
  }
//   return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author= req.params.author;
   if (author) {
    const isbn=Object.keys(books).length;

    const authorlist=[];
    const pointer=[];
    
    for (let index = 1; index < isbn; index++) {
        const value= books[index]['author'];
        authorlist.push(value);
    }
    
    
    const real=authorlist.filter((names,index)=>{
        if (names===author) {
            pointer.push(books[index + 1])
            return names
        }
    })
    if (pointer.length>0) {
        res.status(300).send(JSON.stringify(pointer,null,4))
    } else {
        res.status(300).send('this author does not exist');
    }
   } else {
      res.status(300).send('invalid request URL') 
   }
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title= req.params.title;
  let bookTitle=[];
  const pointer1=[];
  const list=Object.keys(books).length;
  if (title) {
  for (let index = 1; index < list; index++) {
    const value= books[index]['title'];
    bookTitle.push(value);
}
const real=bookTitle.filter((names,index)=>{
    if (names===title) {
        pointer1.push(books[index + 1])
        return names
    }
    });
    if (pointer1.length>0) {
        res.status(300).send(JSON.stringify(pointer1,null,4))
    } else {
        res.status(300).send('this book does not exist');
    }
}else{
    res.status(300).send('invalid request URL');
}
//   return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn= req.params.isbn;
  if(isbn){
      const review= books[isbn]['reviews'];
      res.status(300).send(JSON.stringify(review));
  }
  else{
      res.status(300).send('invalid request URL');
  }
//   return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
