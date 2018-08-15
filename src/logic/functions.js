export const getMovies = () => {
    //var HOST = location.origin.replace(/^http/, 'ws')
    ws.onopen = () => {
        send('movie-request', 'popular', ws);
    }
}

function send(type, msg, ws) {
    const message = {
        type: type,
        msg: msg
    }
    ws.send(JSON.stringify(message));
}