import React from 'react';
import Header from '../header';
import Main from './main';
const MainScreen = (props) => (
  <div className="page page--gray page--main">
    <Header/>
    <Main {...props}/>
  </div>
);
export default MainScreen;
