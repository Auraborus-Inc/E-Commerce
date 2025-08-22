const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// Create Order
router.post("/orders", ordersController.createOrder);

// Get All Orders (with ?user_id=1 filter)
router.get("/orders", ordersController.getAllOrders);

// Get Order by ID (with items)
router.get("/orders/:id", ordersController.getOrderById);

// Update Order Status
router.put("/orders/:id", ordersController.updateOrderStatus);

// Delete Order
router.delete("/orders/:id", ordersController.deleteOrder);

module.exports = router;
