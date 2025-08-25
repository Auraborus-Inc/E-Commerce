/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("cart", function (table) {
    table.increments("id").primary(); // PK for each cart item

    // user_id -> FK to users table (UUID)
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("user") // or "users", depending on your actual table name
      .onDelete("CASCADE");

    // product_id -> FK to productsIndustryStands (check its PK type!)
    table
      .integer("product_id") // change to .uuid() if productsIndustryStands.id is uuid
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("productsIndustryStands")
      .onDelete("CASCADE");

    table.integer("quantity").notNullable().defaultTo(1);
    table.decimal("price", 10, 2).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("cart");
};
