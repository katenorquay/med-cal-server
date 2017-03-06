exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table) {
    table.increments('id')
    table.string('facebook.id')
    table.string('facebook.token')
    table.string('facebook.name')
    table.string('facebook.email')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
