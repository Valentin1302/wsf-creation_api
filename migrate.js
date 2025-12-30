const connection = require('./models/connection.js');
require('./models/index.js');
connection
.sync({ 
    alter: true,
})
.then(() => console.log('Database synchronized'))
.then(() => connection.close());
