import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './authorQuiz';
import AddAuthorForm from './AddAuthorForm';
import reportWebVitals from './reportWebVitals';
import {shuffle, sample} from 'underscore';
import { BrowserRouter, Route, withRouter} from 'react-router-dom';

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

let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  };
}

function App() {
  return <AuthorQuiz {...state} 
    onAnswerSelected={onAnswerSelected} 
    onContinue={() => {
      state = resetState();
      render();
  }} />;
}

const AuthorWrapper = withRouter(({ history }) => 
  <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }} />
);

function render() {
  ReactDOM.render(<BrowserRouter>
    <React.Fragment>
      <Route exact path='/' component={App} /> 
      <Route path='/add' component={AuthorWrapper} />
    </React.Fragment>
    </BrowserRouter>, document.getElementById('root')
  );
}
render();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
