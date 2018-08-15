import React from 'react';
import ReactDOM from 'react-dom';

import '../src/styles/app.css';
import '../src/styles/appStyles.scss';

import Card from './components/Card.js';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: "something",
        };
    }
    render(){
        return(
            <Card />
        );
    }
}

ReactDOM.render(<App />,
  document.getElementById('app'),
);
if (module.hot) {
  module.hot.accept();
}