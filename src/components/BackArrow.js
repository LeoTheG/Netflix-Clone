import React from 'react';

export default class BackArrow extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
            <div>
                <i class="fa fa-arrow-left" aria-hidden="true" onClick={this.handleClick} />
            </div>
        );
    }
    handleClick(){
        window.location.href = "/";
    }
}