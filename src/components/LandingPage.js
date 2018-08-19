import React from 'react';
import Row from './Row.js';

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };

        ws.onmessage = (msg) => {
            const parsedMsg = JSON.parse(msg.data);
            if(parsedMsg.response === 'movie-response'){
                const page = parsedMsg.msg.page;
                const data = parsedMsg.msg.data;
                const newData = this.state.data;
                console.log("pushed new data for page: " + page);
                newData.push(data);
                this.setState({data: newData});
            }
        }
    }
    render() {
        if(this.state.data){
            return(
            <div class="rows">
                <Row data={this.state.data[0]} id='1' />
                <Row data={this.state.data[1]} id='2' />
                <Row data={this.state.data[2]} id='3' />
                <Row data={this.state.data[3]} id='4' />
            </div>
            );
        }
        else{
            return(
                <h1>You probably shouldn't be seeing this...</h1>
            );
        }
    }

}