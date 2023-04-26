const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // find all products
    // be sure to include its associated Category and Tag data
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Tag,
          attributes: ['tag_name'],
        },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Tag,
          attributes: ['tag_name'],
        },
      ],
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    // validate input data
    const { product_name, price, stock, tagIds } = req.body;
    if (!product_name || !price || !stock || !Array.isArray(tagIds)) {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }
    // sanitize user input
    const sanitizedProductName = product_name.replace(/'/g, "''");
    const sanitizedPrice = parseFloat(price);
    const sanitizedStock = parseInt(stock);
    // create a new product
    const product = await Product.create({
      product_name: sanitizedProductName,
      price: sanitizedPrice,
      stock: sanitizedStock,
    });
    // create associated tags
    if (tagIds.length) {
      const productTagIdArr = tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // validate input data
    const { product_name, price, stock, tagIds } = req.body;
    if (!product_name && !price && !stock && !Array.isArray(tagIds)) {
      res.status(400).json({ message: 'Invalid input data' });
      return;
    }
    // sanitize user input
    const sanitizedProductName = product_name ? product_name.replace(/'/g, "''") : undefined;
    const sanitizedPrice = price ? parseFloat(price) : undefined;
    const sanitizedStock = stock ? parseInt(stock) : undefined;

    // update product data
const updatedProduct = await Product.update(
  {
    product_name: sanitizedProductName,
    price: sanitizedPrice,
    stock: sanitizedStock,
  },
  {
    where: {
      id: req.params.id,
    },
  }
);
if (!updatedProduct[0]) {
  res.status(404).json({ message: 'No product found with this id' });
  return;
}

// update associated tags
if (Array.isArray(tagIds)) {
  const productTags = await ProductTag.findAll({
    where: {
      product_id: req.params.id,
    },
  });
  const productTagIds = productTags.map(({ tag_id }) => tag_id);
  const newProductTags = tagIds
    .filter((tag_id) => !productTagIds.includes(tag_id))
    .map((tag_id) => {
      return {
        product_id: req.params.id,
        tag_id,
      };
    });
  const productTagsToRemove = productTags
    .filter(({ tag_id }) => !tagIds.includes(tag_id))
    .map(({ id }) => id);
  await Promise.all([
    ProductTag.destroy({
      where: {
        id: productTagsToRemove,
      },
    }),
    ProductTag.bulkCreate(newProductTags),
  ]);
}

res.json({ message: 'Product updated successfully' });

} catch (err) {
  console.log(err);
  res.status(500).json({ message: 'Unable to update product' });
  }
  });
  
  // delete product
  router.delete('/:id', async (req, res) => {
  try {
  // delete one product by its id value
  const deletedProduct = await Product.destroy({
  where: {
  id: req.params.id,
  },
  });
  if (!deletedProduct) {
  res.status(404).json({ message: 'No product found with this id' });
  return;
  }
  res.json({ message: 'Product deleted successfully' });
  } catch (err) {
  console.log(err);
  res.status(500).json({ message: 'Unable to delete product' });
  }
  });
  
  module.exports = router;
  
  