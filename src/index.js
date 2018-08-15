import React from 'react';
import ReactDOM from 'react-dom';

import '../src/styles/app.css';
import '../src/styles/appStyles.scss';

import Row from './components/Row.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "something",
            data: null,
        };

        ws.onmessage = (msg) => {
            console.log("got message: " + msg.data);
            const parsedMsg = JSON.parse(msg.data);
            //this.state.data = parsedMsg.msg;
            this.setState({ data: parsedMsg.msg });
            //console.log("got message from server: " + JSON.stringify(parsedMsg.msg));
            console.log("data=" + JSON.stringify(this.state.data));
        }
    }
    render() {
        return (
            <Row data={this.state.data} />
        );
    }
}

ReactDOM.render(<App />,
    document.getElementById('app'),
);
if (module.hot) {
    module.hot.accept();
}
