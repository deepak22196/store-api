const express = require("express");
const router = express.Router();

const {
  populateDB,
  getAllProducts,
} = require("../controllers/productControllers");

router.get("/populateDB", populateDB);
router.get("/", getAllProducts);

module.exports = router;
