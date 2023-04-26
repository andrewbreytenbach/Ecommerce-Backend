const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
      const newProduct = await Product.findByPk(product.id, {
        include: [{ model: Category }, { model: Tag, through: ProductTag }],
      });
      res.status(200).json(newProduct);
    } else {
      const newProduct = await Product.findByPk(product.id, {
        include: [{ model: Category }, { model: Tag, through: ProductTag }],
      });
      res.status(200).json(newProduct);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a product by id
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (req.body.tagIds) {
      // find all associated tags from ProductTag
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
      const updatedProduct = await Product.findByPk(req.params.id, {
        include: [{ model: Category }, { model: Tag, through: ProductTag }],
      });
   // product with updated tags
res.status(200).json(updatedProduct);
} else {
const updatedProduct = await Product.findByPk(req.params.id, {
include: [{ model: Category }, { model: Tag, through: ProductTag }],
});
res.status(200).json(updatedProduct);
}
} catch (err) {
res.status(500).json(err);
}
});

// DELETE a product by id
router.delete('/:id', async (req, res) => {
try {
const product = await Product.destroy({ where: { id: req.params.id } });
if (!product) {
res.status(404).json({ message: 'No product found with this id!' });
return;
}
res.status(200).json(product);
} catch (err) {
res.status(500).json(err);
}
});

module.exports = router;
