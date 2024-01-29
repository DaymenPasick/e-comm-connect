//Functionality for req endpoint /api/products
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({include: 
      [{
       model: Category,

       //will hide category id from req response
       attributes: {
        exclude: ['id']
       }
      },
      {
       model: Tag,

       //will hide tag id from req response
       attributes: {
        exclude: ['id']
       }
      },
    ],
  
    //will hide tag id from req response  
    attributes: {
      exclude: ['id']
    },
  
  });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {include:
       [
        {
         model: Category,

         //will hide tag id from req response
         attributes: {
          exclude: ['id']
         }

        },
        {
         model: Tag,

         //will hide tag id from req response
         attributes: {
          exclude: ['id']
         }

        }
      ],

      //will hide tag id from req response
      attributes: {
        exclude: ['id']
      },
    
    });
    if (!productData) {
      res.status(404).json({ message: 'No tag with this id!',
     });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create new product
router.post('/', async (req, res) => {

  try {
    const product = await Product.create(req.body);
    // if there's product tags, we need to create pairings by using the setTags method
    if (req.body.tagIds) {
      await product.setTags(req.body.tagIds);
      await product.save();
      return res.status(200).json(await product.getTags());
    }
    // if no product tags, just respond
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Update product by id
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { 
      include: [Tag],
    });
    // update product data
    product.update(req.body);
    // if there's product tags, we need to create pairings by using the setTags method
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

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
