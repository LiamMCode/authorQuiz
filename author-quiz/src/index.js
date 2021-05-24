import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './authorQuiz';
import reportWebVitals from './reportWebVitals';
import {shuffle, sample} from 'underscore';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/MarkTwain.jpg', 
    imageSource: 'Wikimedia Commons', 
    books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It']
  }, 
  {
    name: 'Joesph Conrad', 
    imageUrl: 'images/authors/JoesphConrad.png', 
    imageSource: 'Wikimedia Commons', 
    books: ['Heart of Darkness']
  }, 
  {
    name: 'J.K Rowling', 
    imageUrl: 'images/authors/JkRowling.jpg', 
    imageSource: 'Wikimedia Commons', 
    books: ['Harry Potter and the Sorcerers Stone']
  }, 
  {
    name: 'Stephen King', 
    imageUrl: 'images/authors/StephenKing.jpg', 
    imageSource: 'Wikimedia Commons', 
    books: ['The Shinnning', 'IT']
  }, 
  {
    name: 'Charles Dickens', 
    imageUrl: 'images/authors/CharlesDickens.jpg', 
    imageSource: 'Wikimedia Commons', 
    books: ['David Copperfield', 'A tale of Two Cities']
  },
  {
    name: 'William Shakespeare', 
    imageUrl: 'images/authors/WilliamShakesphere.jpg', 
    imageSource: 'Wikimedia Commons', 
    books: ['Hamlet', 'Macbeth', 'Romeo & Juliet']
  }
]

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p,c,i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks, 
    author: authors.find((author) => author.books.some((title) => title === answer))
  }
}

const state = {
  turnData: getTurnData(authors)
}

ReactDOM.render(<AuthorQuiz {...state}/>, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
