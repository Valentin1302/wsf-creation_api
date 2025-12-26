const Game = require('./game');
const Publisher = require('./publisher');
const Category = require('./category');


Publisher.hasMany(Game, { foreignKey: 'publisher_id' });
Game.belongsTo(Publisher, { foreignKey: 'publisher_id' });

Game.belongsToMany(Category, { through: 'game_categories' });
Category.belongsToMany(Game, { through: 'game_categories' });

module.exports = { Game, Publisher, Category };