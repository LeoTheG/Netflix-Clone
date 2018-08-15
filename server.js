const express = require('express');
const app = express();
const axios = require('axios');
const wsServer = require('ws').Server;
require('dotenv').config();

app.set('port', 3000);
const server = app.listen(app.get('port'), function () {
    console.log('Express server started on port ' + app.get('port'));
});

const apiUrl = {
    base: "https://api.trakt.tv",
    auth: "/oauth/authorize",
    movies: {
        popular: '/movies/popular',
        trending: '/movies/trending',
    },
    tmdb: {
        base: 'https://api.themoviedb.org/3',
        image: 'http://image.tmdb.org/t/p'
    }
}
const defaultHeaders = {
    'Content-type': 'application/json',
    'trakt-api-key': process.env.client_id,
    'trakt-api-version': 2,
}
const posterWidth = 500;
app.get('/api/movies/popular', (req, res) => {
    getMovies.combined((data) => {
        res.send(data);
    })
})
app.get('/api/*', (req, res) => {
    res.send('<h1 style="text-align:center">Did you come to the wrong place?</h1>');
})

getMovies = {
    popular: (callback) => {
        axios.get(apiUrl.base + apiUrl.movies.popular, {
            headers: defaultHeaders
        }).then((res) => {
            callback(res);
        }).catch((err) => {
            console.log(err);
        })
    },
    images: (id, callback) => {
        axios.get(apiUrl.tmdb.base + '/movie/' + id + '/images', {
            params: {
                api_key: process.env.tmdb_key
            }
        }).then((res) => {
            callback(res);
        })
    },
    // crazy callback code that gets popular movie titles, years, and urls
    combined: (callback) => {
        const list = [];
        getMovies.popular((val) => {
            const movies = val.data;
            ((call)=>{
                let counter = 0;
                for (const movie in movies) {
                    const tmdbId = movies[movie].ids.tmdb;
                    ((callback)=>{
                        //extract url
                        getMovies.images(tmdbId, (img) => {
                            const url = apiUrl.tmdb.image + '/w' + posterWidth + '//' + img.data.backdrops[0]['file_path'];
                            // after getting url, get titles + etc.
                            callback(url);
                        })
                    })((url)=>{
                        // extract title, year
                        const title = movies[movie].title;
                        const year = movies[movie].year;
                        list.push({ title: title, year: year, url: url });
                        counter++;
                        if(counter==movies.length-1){
                            // after list of movies is full, exit loop
                            call(list);
                        }
                    });
                }
            })((list)=>{
                callback(list);
            });
        });
    }
}

authorize = () => {
    axios.get(apiUrl.base + apiUrl.auth, {
        params: {
            response_type: 'code',
            client_id: process.env.client_id,
            redirect_uri: 'http://localhost:3000',
        },
        headers: defaultHeaders
    }).then((res) => {
        console.log(res);
    }).catch((err) => { console.log(err) });
}

//-----websockets------//
wss = new wsServer({ server: server });
wss.on('connection', (ws) => {
    console.log("connected to a user");
    ws.on('message', (msg) => {
        //const parsedMsg = JSON.parse(msg);
        getMovies.combined((data) => {
            send('movies', data, ws);
        })
    });
})
function send(type, msg, ws) {
    const message = {
        type: type,
        msg: msg
    }
    ws.send(JSON.stringify(message));
}