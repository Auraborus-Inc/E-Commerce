  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.up = function(knex) {
    return knex.schema.createTable('productsIndustryStands', function(table){
      table.increments('id').primary().comment('Primary key, auto-incrementing product ID');

      table.string('name', 255).notNullable().comment('Product name');
      table.text('description').nullable().comment('Detailed product description');
      table.string('sku', 100).unique().notNullable().comment('Unique stock keeping unit identifier');
      table.decimal('price', 10, 2).notNullable().comment('Product price in local currency');
      table.integer('stock_quantity').defaultTo(0).notNullable().comment('Available stock count');
      table.string('brand', 100).nullable().comment('Brand of the product');
      table.text('image_url').nullable().comment('Link to product image');

      table.integer('category_id')
          .unsigned()
          .references('id')
          .inTable('catagories')
          .onDelete('SET NULL')
          .onUpdate('CASCADE')
          .nullable()
          .comment('Foreign key to categories table');

      table.boolean('is_active').defaultTo(true).comment('Flag to mark if product is active or visible');
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable().comment('Product creation timestamp');
      table.timestamp('updated_at').defaultTo(knex.fn.now()).comment('Last updated timestamp');
      table.timestamp('deleted_at').nullable().comment('Soft delete timestamp, NULL if not deleted');
    });
    
  };

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schems.dropTableIfExists('productsIndustryStands');
  };
