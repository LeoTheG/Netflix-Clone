import React from 'react';
import Card from './Card';

// receives data after api call to server
export default class Row extends React.Component {
    constructor(props){
        super(props);
        this.state = {data:props.data, id:props.id};
    }
    render() {
        return (
            <div id={'row-' + this.state.id}>
                <h1>Popular Movies {this.state.id}</h1>
                <div class="row-cards">
                    <Card data={this.getData(0)}/>
                    <Card data={this.getData(1)} />
                    <Card data={this.getData(2)} />
                    <Card data={this.getData(3)} />
                    <Card data={this.getData(4)} />
                    <Card data={this.getData(5)} />
                </div>
            </div>
        );
    }
    getData(i){
        if(!this.props.data){
            return ({url:"",title:"",year:""})
        }
        else{
            return this.props.data[i];
        }
    }
}