const database = require('../databseConnectivity');

// -------------------- CRUD Endpoints --------------------
// POST /addProduct
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      sku,
      price,
      stock_quantity,
      brand,
      category_id,
      is_active,
      image
    } = req.body;

    // Validate required fields
    if (!name || !sku || price == null || stock_quantity == null || !category_id) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // Insert product and return the inserted id
    const [{ id }] = await database("productsIndustryStands")
      .insert({
        name,
        description,
        sku,
        price,
        stock_quantity,
        brand,
        category_id,
        is_active: is_active ?? true,
        image_url: image ?? null,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning("id"); // Postgres returns [{id: 91}]

    // Fetch the full product using the numeric id
    const newProduct = await database("productsIndustryStands")
      .where({ id })
      .first();

    res.status(201).json(newProduct);

  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// GET /getAllProducts
exports.getAllProducts = async (req, res) => {
  try {
    const products = await database('productsIndustryStands').select('*');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// GET /getProductById/:id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await database('productsIndustryStands').where({ id }).first();

    if (!product) return res.status(404).send('Product not found');
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// GET /getProductByName/:name
exports.getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const product = await database('productsIndustryStands')
      .whereILike('name', `%${name}%`);

    if (!product.length) return res.status(404).send('No product found with given name');
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// GET /getProductByCategory/:category
exports.getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await database('productsIndustryStands')
      .whereILike('category', `%${category}%`);

    if (!products.length) return res.status(404).send('No products found in this category');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// PUT /updateProductById/:id
exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      sku,
      price,
      stock_quantity,
      brand,
      category_id,
      is_active
    } = req.body;

    if (
      !name &&
      !description &&
      !sku &&
      price == null &&
      stock_quantity == null &&
      !brand &&
      !category_id &&
      typeof is_active === "undefined"
    ) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(sku && { sku }),
      ...(price != null && { price }),
      ...(stock_quantity != null && { stock_quantity }),
      ...(brand && { brand }),
      ...(category_id && { category_id }),
      ...(typeof is_active !== "undefined" && { is_active }),
      updated_at: new Date()
    };

    const updated = await database("productsIndustryStands")
      .where({ id })
      .update(updateData);

    if (!updated) return res.status(404).json({ message: "Product not found" });

    const product = await database("productsIndustryStands").where({ id }).first();

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT /updateProductByName/:name
exports.updateProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { category, description, price, quantity } = req.body;

    const updated = await database('productsIndustryStands')
      .where({ name })
      .update({ category, description, price, quantity });

    if (!updated) return res.status(404).send('Product not found with given name');
    const product = await database('productsIndustryStands').where({ name }).first();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// DELETE /deleteProductById/:id
exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await database('productsIndustryStands').where({ id }).del();

    if (!deleted) return res.status(404).send('Product not found');
    res.status(200).send('Product deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// DELETE /deleteProductByName/:name
exports.deleteProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const deleted = await database('products').where({ name }).del();

    if (!deleted) return res.status(404).send('Product not found with given name');
    res.status(200).send('Product deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
