import React from 'react';
import Card from './Card';
import {getMovies} from '../logic/functions';

export default class Row extends React.Component {
    constructor(props){
        console.log("got props:"+JSON.stringify(props));
        super(props);
        this.state = {
            data: props.data,
        }
    }
    componentDidMount() {
        console.log("component mounted");
        getMovies();
    }
    render() {
        return (
            <div class="wrapper">
                <Card url={this.getUrl()} />
            </div>
        );
    }
    getUrl(){
        if(!this.state.data){
            console.log("data is null");
            return 'http://image.tmdb.org/t/p/w500///n1y094tVDFATSzkTnFxoGZ1qNsG.jpg';
        }
        else{
            console.log("data is not null");
            return this.state.data[0].url;
        }
    }
}
/*
<Card url='http://image.tmdb.org/t/p/w500///n1y094tVDFATSzkTnFxoGZ1qNsG.jpg'/>
*/