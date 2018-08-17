import React from 'react';

export default class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", year: "", url: "" };
    }
    componentWillReceiveProps(props) {
        this.setState({ title: props.data.title, year: props.data.year, url: props.data.url });
    }
    render() {
        return (
            <div class="img-container" style={{backgroundImage: "url("+this.state.url+")"}}>
                <h1 class="poster-title">{this.state.title}</h1>
            </div>

        );
    }
}