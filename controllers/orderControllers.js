const database = require('../databseConnectivity');

// ============================
// POST /orders → Create Order
// ============================
exports.createOrder = async (req, res) => {
  try {
    const { user_id, items } = req.body;

    if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "user_id and items are required" });
    }

    // Calculate total price
    const total_price = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Insert into orders table
    const [orderId] = await database("orders").insert(
      { user_id, total_price, status: "pending" },
      ["id"]
    );

    const order_id = orderId.id;

    // Insert order items
    for (let item of items) {
      await database("order_items").insert({
        order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      });
    }

    const order = await database("orders").where({ id: order_id }).first();
    res.status(201).json({ ...order, items });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// ============================
// GET /orders → Get all orders (optionally by user_id)
// ============================
exports.getAllOrders = async (req, res) => {
  try {
    let query = database("orders").select("*");
    if (req.query.user_id) query.where("user_id", req.query.user_id);

    const orders = await query;
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// ============================
// GET /orders/:id → Get single order with items
// ============================
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await database("orders").where({ id }).first();

    if (!order) return res.status(404).send("Order not found");

    const items = await database("order_items").where({ order_id: id });
    res.status(200).json({ ...order, items });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// ============================
// PUT /orders/:id → Update status
// ============================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).send("Status is required");

    const updated = await database("orders")
      .where({ id })
      .update({ status, updated_at: database.fn.now() });

    if (!updated) return res.status(404).send("Order not found");

    const order = await database("orders").where({ id }).first();
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// ============================
// DELETE /orders/:id
// ============================
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await database("orders").where({ id }).del();

    if (!deleted) return res.status(404).send("Order not found");

    res.status(200).send("Order deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
