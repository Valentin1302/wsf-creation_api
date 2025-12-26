const connection = require('./models/connection.js');
require('./models/user.js');
require('./models/game.js');
require('./models/category.js');
require('./models/publisher.js');
connection
.sync({ 
    alter: true,
})
.then(() => console.log('Database synchronized'))
.then(() => connection.close());
