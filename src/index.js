import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../src/styles/app.css';
import '../src/styles/appStyles.scss';
import Movie from '../src/components/Movie';
import Menu from '../src/components/Menu';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import LandingPage from './components/LandingPage';


class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <div>
                    <Route path="/movie/:slug" component={Movie}/>
                    <Route exact path="/" component={LandingPage}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />,
    document.getElementById('app'),
);
if (module.hot) {
    module.hot.accept();
}
/*
<div class="rows">
<Row data={this.state.data[0]} id='1' />
<Row data={this.state.data[1]} id='2' />
<Row data={this.state.data[2]} id='3' />
<Row data={this.state.data[3]} id='4' />
</div>
*/