/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("test_table").del();

	// Inserts seed entries
	await knex("test_table").insert([
		{ name: "Alice", age: 25 },
		{ name: "Bob", age: 30 },
		{ name: "Charlie", age: 35 },
	]);
};
