
async function up(knex) {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('email').unique();
    table.string('password');
    table.string('firstname');
    table.string('lastname');
    table.timestamps();
  });
}

async function down(knex) {
  await knex.schema.dropTable('user');
}


module.exports = { up, down };
