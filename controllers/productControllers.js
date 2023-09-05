const sampleData = require("../sampleData.js");
const Product = require("../models/product.js");
const populateDB = async (req, res) => {
  try {
    await Product.create(sampleData);
    res.status(200).json({ message: "database populated successfully" });
  } catch (error) {
    res.status(500).json({ message: "error adding sample data to database" });
  }
};

const getAllProducts = (req, res) => {
  res.send("all products");
};

module.exports = { populateDB, getAllProducts };
