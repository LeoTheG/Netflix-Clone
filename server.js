const express = require('express');
const app = express();
const axios = require('axios');
const wsServer = require('ws').Server;
require('dotenv').config();


const posterWidth = 500;
const moviePageWidth = 780;
const posterLimit = 6;


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
        summary: '/movies/',
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
app.get('/api/movies/popular', (req, res) => {
    getMovies.combined((data) => {
        res.send(data);
    },1)
})
app.get('/api/*', (req, res) => {
    res.send('<h1 style="text-align:center">Did you come to the wrong place?</h1>');
})

getMovies = {
    popular: (callback,page) => {
        axios.get(apiUrl.base + apiUrl.movies.popular, {
            headers: defaultHeaders,
            params: {
                page: page,
                limit: posterLimit
            }
        }).then((res) => {
            callback(res);
        }).catch((err) => {
            console.log(err);
        })
    },
    images: (id, callback) => {
        axios.get(apiUrl.tmdb.base + '/movie/' + id + '/images', {
            headers: defaultHeaders,
            params: {
                api_key: process.env.tmdb_key
            }
        }).then((res) => {
            callback(res);
        })
    },
    // crazy callback code that gets popular movie titles, years, and urls
    combined: (callback,page) => {
        const list = [];
        getMovies.popular((val) => {
            const movies = val.data;
            ((call)=>{
                let counter = 0;
                for (const movie in movies) {
                    const tmdbId = movies[movie].ids.tmdb;
                    const slug = movies[movie].ids.slug;
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
                        list.push({ title: title, year: year, url: url, slug: slug});
                        if(list.length==movies.length){
                            // after list of movies is full, exit loop
                            call(list);
                        }
                    });
                }
            })((list)=>{
                callback(list);
            });
        },page);
    },
    summary: (slug,callback) => {
        axios.get(apiUrl.base + apiUrl.movies.summary + slug, {
            headers: defaultHeaders,
            params: {
                extended: 'full'
            }
        }).then((value) => {
            const tmdbId = value.data.ids.tmdb;
            //callback(value)res;
            getMovies.images(tmdbId, (img) => {
                const url = apiUrl.tmdb.image + '/w' + moviePageWidth + '//' + img.data.backdrops[0]['file_path'];
                // after getting url, get titles + etc.
                value.data.url = url;
                callback(value);
            })
        }).catch((err) => {
            console.log(err);
        })
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
        const parsedMsg = JSON.parse(msg);
        const request = parsedMsg.request;
        if(request=='movie-request'){
            const page = parsedMsg.msg.page;
            // todo: check for movie type: popular
            getMovies.combined((data) => {
                send('movie-response', {page: page,data:data}, ws);
            },page)
        }
        else if(request=='movie-summary-request'){
            const slug = parsedMsg.msg;
            getMovies.summary(slug,(value)=>{
                const dat = {
                    title: value.data.title,
                    year: value.data.year,
                    tagline: value.data.tagline,
                    overview: value.data.overview,
                    genres: value.data.genres,
                    certification: value.data.certification,
                    url: value.data.url,
                }
                send('movie-summary-response',{data:dat},ws);
            });
        }
    });
})
function send(type, msg, ws) {
    const message = {
        response: type,
        msg: msg
    }
    ws.send(JSON.stringify(message));
}