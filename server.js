const express = require('express');
const app = express();

app.set('port', 3000);
app.listen(app.get('port'), function() {
    console.log('Express server started on port ' + app.get('port'));
});
app.get('/api/*',(req,res)=>{
    res.send('hi');
    console.log("whoah!");
} )