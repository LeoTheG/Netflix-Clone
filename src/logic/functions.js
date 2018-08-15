function send(type, msg, ws) {
    const message = {
        type: type,
        msg: msg
    }
    ws.send(JSON.stringify(message));
}