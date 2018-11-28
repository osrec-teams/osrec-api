exports.up = function(knex, Promise) {
  return knex.schema.createTable('chatrooms', function(table) {
    table.increments();
    table
      .string('name')
      .notNull()
      .unique();
    table.string('description');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chatrooms');
};
