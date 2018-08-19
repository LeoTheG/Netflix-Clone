import React from 'react';
import BackArrow from './BackArrow';

export default class Movie extends React.Component {
    constructor(props) {
        super(props);
        if(ws.readyState === ws.OPEN)
            ws.send(JSON.stringify({request:'movie-summary-request',msg:this.props.match.params.slug}));
        else{
            const intervalID = setInterval(()=>{
                if(ws.readyState === ws.OPEN){
                    console.log("finally open!!!");
                    ws.send(JSON.stringify({request:'movie-summary-request',msg:this.props.match.params.slug}));
                    clearInterval(intervalID);
                }
                else console.log("still not open!");
            },200)
        }

        //make movie summary request to server to get back details
        ws.onmessage = (msg) => {
            const parsedMsg = JSON.parse(msg.data);
            if(parsedMsg.response === 'movie-summary-response'){
                this.setState({data: parsedMsg.msg.data});
                console.log("this.state.data="+JSON.stringify(this.state.data));
            }
        }
    }
    render() {
        if(this.state && this.state.data){
            return (
                <div id="movie-page">
                    <BackArrow />
                    <h1>{this.state.data.title}</h1>
                    <img class="movie-page-image" src={this.state.data.url}/>
                    <h2 class="movie-page-overview">{this.state.data.overview}</h2>
                </div>
            );
        }
        else
        return (
            <div>
            <h1>{this.props.match.params.slug}</h1>
            </div>
        );
    }
}
/*
                <div>
                    <h1 className='movie-page-title'>{this.state.data.title}</h1>
                    <div style={{backgroundImage: "url("+this.state.data.url+")"}}>
                    </div>
                </div>
                */

                /*
               this is working vvvv 
                <div class="movie-page-image" style={{backgroundImage: "url("+this.state.data.url+")"}}>
                    <h1 >{this.state.data.title}</h1>
                </div>
                */