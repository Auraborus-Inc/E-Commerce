const database = require('../databseConnectivity');

// POST /addProduct
exports.addProduct = async (req, res) => {
  try {
    const { name, category, description, price, quantity } = req.body;

    if (!name || !price || quantity == null) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const [id] = await database('productsIndustryStands').insert({ name, category, description, price, quantity });
    const newProduct = await database('productsIndustryStands').where({ id }).first();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
    const product = await database('productsIndustryStands').whereILike('name', `%${name}%`);

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
    const products = await database('productsIndustryStands').whereILike('category', `%${category}%`);

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
    const { name, category, description, price, quantity } = req.body;

    const updated = await database('productsIndustryStands').where({ id }).update({ name, category, description, price, quantity });

    if (!updated) return res.status(404).send('Product not found');
    const product = await database('productsIndustryStands').where({ id }).first();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// PUT /updateProductByName/:name
exports.updateProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { category, description, price, quantity } = req.body;

    const updated = await database('productsIndustryStands').where({ name }).update({ category, description, price, quantity });

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
