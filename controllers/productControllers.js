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

const getAllProducts = async (req, res) => {
  const queryObject = {}; //to just pass the fields that we want to filter and ignore rest of the query keys

  const { featured, company, name, sort } = req.query;
  if (featured) {
    queryObject.featured = Boolean(featured);
  }

  if (company) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, option: i };
  }

  let result = Product.find(queryObject); //not using await to chain sort later

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  console.log(page);
  const skip = (page - 1) * limit;
  console.log(skip);

  result = result.skip(skip).limit(limit);
  const products = await result;

  res.status(200).json({ products });
};

module.exports = { populateDB, getAllProducts };
