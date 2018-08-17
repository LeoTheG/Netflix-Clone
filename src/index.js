import React from 'react';
import ReactDOM from 'react-dom';

import '../src/styles/app.css';
import '../src/styles/appStyles.scss';

import Row from './components/Row.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };

        ws.onmessage = (msg) => {
            const parsedMsg = JSON.parse(msg.data);
            const page = parsedMsg.msg.page;
            const data = parsedMsg.msg.data;
            //this.setState({ data: parsedMsg.msg });
            // data organized by page = index
            //this.state.data.push(data);
            const newData = this.state.data;
            console.log("pushed new data for page: " + page);
            newData.push(data);
            this.setState({data: newData});
            //console.log("data=" + JSON.stringify(this.state.data));
        }
    }
    render() {
        return (
            <div class="rows">
                <Row data={this.state.data[0]} id='1' />
                <Row data={this.state.data[1]} id='2' />
                <Row data={this.state.data[2]} id='3' />
                <Row data={this.state.data[3]} id='4' />
            </div>
        );
    }
}

ReactDOM.render(<App />,
    document.getElementById('app'),
);
if (module.hot) {
    module.hot.accept();
}
