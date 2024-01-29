//Functionality for req endpoint /api/products
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



//Get all Products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({include: 
      [{
       model: Category,
      },
    ],
  });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a Product by ID
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {include:
       [
        {
         model: Category,
        }
      ],
    });
    if (!productData) {
      res.status(404).json({ message: 'No product with this id!',
     });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new Product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // setTags() will create pairings if prior tags exist
    if (req.body.tagIds) {
      await product.setTags(req.body.tagIds);
      await product.save();
      return res.status(200).json(await product.getTags());
    }
    // if no product tags exists...
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});



//Update Product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { 
      include: [Tag],
    });

    // update product data
    product.update(req.body);

    //setTags() will create pairings if prior tags exist
    if (req.body.tagIds) {
      await product.setTags(req.body.tagIds);
    }
    await product.save();
    await product.reload();
    return  res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});



//Delete a Product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
