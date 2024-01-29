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
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);
  } catch (err) {
    
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No tag with that ID' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
