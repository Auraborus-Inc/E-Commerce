const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");

router.post("/addItemToCart", cartController.addToCart);
router.post("/checkout", cartController.checkout);
router.get("/fetchCart", cartController.fetchCartItems);
router.delete("/removeItemFromCart", cartController.removeCartItem);

module.exports = router;
