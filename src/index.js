import app from './app.js';

app.listen(app.get('port'));

console.log('servidor arriba', app.get('port'));


