import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';


import Main from './components/Main';
import './styles/app.scss';

// ReactDOM.render(
//   <Main />,
  
//   document.getElementById('app')
// );





// AppContainer is a necessary wrapper component for HMR

//import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(Main);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Main', () => {
    render(Main)
  });
}