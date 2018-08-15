import React from 'react';
import Card from './Card';
import {getMovies} from '../logic/functions';

export default class Row extends React.Component {
    constructor(props){
        console.log("got props:"+JSON.stringify(props));
        super(props);
        this.state = {data:props.data};
    }
    componentDidMount() {
    }
    componentWillReceiveProps(props){
        this.setState({title: props.title, year:props.year, url:props.url});
    }
    render() {
        return (
            <div class="wrapper">
                <Card data={this.getData(0)}/>
                <Card data={this.getData(1)} />
                <Card data={this.getData(2)} />
                <Card data={this.getData(3)} />
            </div>
        );
    }
    getData(i){

        if(!this.props.data){
            console.log("data is null");
            return ({url:"",title:"",year:""})
        }
        else{
            console.log("data is not null");
            return this.props.data[i];
        }
    }
}