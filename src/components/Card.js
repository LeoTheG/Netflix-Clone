import React from 'react';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", year: "", url: "", slug:"" };
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillReceiveProps(props) {
        this.setState({ title: props.data.title, year: props.data.year, url: props.data.url, slug: props.data.slug});
    }
    render() {
        return (
            <div class="img-container" style={{backgroundImage: "url("+this.state.url+")"}} onClick={this.handleClick}>
                <h1 class="poster-title">{this.state.title}</h1>
            </div>
        );
    }
    handleClick(){
        window.location.href = "/movie/"+this.state.slug;
    }
}