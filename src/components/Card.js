import React from 'react';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", year: "", url: "" };
    }
    componentWillReceiveProps(props) {
        this.setState({ title: props.data.title, year: props.data.year, url: props.data.url });
    }
    render() {
        return (
            <div class="img-container" style={{backgroundImage: "url("+this.state.url+")",
                width:'300px', height:'200px'}} >
                <h1 style={{textAlign: 'center'}}>{this.state.title}</h1>
            </div>

        );
    }
}
/*

                <img src={this.state.url} />
                */