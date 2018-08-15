import React from 'react';

export default class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.title,
            year: props.year,
            url: props.url
        }
    }
    componentWillReceiveProps(props){
        console.log("getting prooooooops!" + JSON.stringify(props));
    }
    render() {
        return (
            <img src={this.state.url} />
        );
    }
}