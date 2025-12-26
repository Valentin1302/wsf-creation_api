const connection = require('./models/connection.js');
require('./models/user.js');
require('./models/task.js');
connection
.sync({ 
    alter: true,
})
.then(() => console.log('Database synchronized'))
.then(() => connection.close());