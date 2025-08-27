const database = require('../databseConnectivity');

exports.addToCart = async(req, res) => {
  try{
    const { user_id, product_id, price } = req.body;

    if(!user_id || !product_id || !price){
      return res.status(400).json({ message: 'user_id, product_id, and price are required' });
    }

    const existingCartItem = await database('cart')
      .where({ user_id, product_id })
      .first();

    if(existingCartItem){
      await database('cart')
        .where({ id: existingCartItem.id })
        .update({
          quantity: existingCartItem.quantity + 1,
          updated_at: database.fn.now()
        });

      return res.status(200).json({ message: 'Cart item quantity updated' });
    } else {
      await database('cart').insert({
        user_id,
        product_id,
        quantity: 1,
        price,
        created_at: database.fn.now(),
        updated_at: database.fn.now()
      });

      return res.status(201).json({ message: 'Product added to cart' });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.fetchCartItems = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    const cartItems = await database('cart')
      .join('productsIndustryStands', 'cart.product_id', 'productsIndustryStands.id')
      .where('cart.user_id', user_id)
      .select(
        'cart.id',
        'cart.product_id',
        'cart.quantity',
        'cart.price',
        'productsIndustryStands.name as product_name' // fetch the product name
      );

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


exports.removeCartItem = async(req, res) => {
  try {
    const { user_id, product_id } = req.body; 

    if(!user_id || !product_id){
      return res.status(400).json({ message: 'user_id and product_id are required' });
    }

    const deletedRows = await database('cart')
      .where({ user_id, product_id })
      .del();

    if(deletedRows === 0){
      return res.status(404).json({ message: 'Cart item not found' });
    }

    return res.status(200).json({ message: 'Cart item removed' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.checkout = async (req, res) => {
  const trx = await database.transaction();
  try {
    const { user_id } = req.body;

    if (!user_id) {
      await trx.rollback();
      return res.status(400).json({ message: 'user_id is required' });
    }

    // 1. Get user cart
    const cartItems = await trx('cart')
      .where({ user_id });

    if (!cartItems.length) {
      await trx.rollback();
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 2. Update product stock
    for (const item of cartItems) {
      const product = await trx('productsIndustryStands')
        .where({ id: item.product_id })
        .first();

      if (!product || product.stock_quantity < item.quantity) {
        await trx.rollback();
        return res.status(400).json({ message: `Not enough stock for product ${item.product_id}` });
      }

      await trx('productsIndustryStands')
        .where({ id: item.product_id })
        .decrement('stock_quantity', item.quantity);
    }

    // 3. Clear the cart
    await trx('cart').where({ user_id }).del();

    await trx.commit();
    return res.status(200).json({ message: 'Checkout successful. Cart cleared and stock updated.' });

  } catch (error) {
    await trx.rollback();
    console.error('Error during checkout:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
