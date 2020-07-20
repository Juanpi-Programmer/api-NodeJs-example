const Database = require('./app/config/database');
const CONFIG = require('./app/config/config');
const App = require('./app/app');

Database.connect();


App.listen(CONFIG.PORT, (error) => {
    if(error) return console.log(error);
    console.log(`Corriendo en ${CONFIG.PORT}`);
});