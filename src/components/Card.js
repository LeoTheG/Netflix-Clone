import React from 'react';

export default class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth/6,
        }
    }
    render() {
        return (
            <h1>Width of ur screen/6 is {this.state.width}</h1>
        );
    }
}