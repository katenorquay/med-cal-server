exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('emojis', function(table) {
      table.increments('id')
      table.integer('x')
      table.integer('y')
      table.string('icon')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('emojis')
};
