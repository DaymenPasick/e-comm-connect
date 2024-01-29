//Functionality for req endpoint /api/categories
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({include:
     [
      {
       model: Product,

       //will hide product id from req response
       attributes: {
        exclude: ['id']
       }

      }
    ],
  
    //will hide category id from req response  
    attributes: {
      exclude: ['id']
    },
  
  });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {include:
       [
        {
         model: Product,

         //will hide product id from req response
         attributes: {
          exclude: ['id']
         }
         
        }
      ],

      //will categorytag id from req response
      attributes: {
        exclude: ['id']
      },
    
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No tag with this id!',
     });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
