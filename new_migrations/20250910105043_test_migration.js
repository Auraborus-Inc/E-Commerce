/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.createTable("test_table", (table) => {
		table.increments("id").primary();
		table.string("name").notNullable();
		table.integer("age").notNullable();
		table.timestamps(true, true); // created_at, updated_at
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("test_table");
};
