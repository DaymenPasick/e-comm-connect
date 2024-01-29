//Functionality for req endpoint /api/tags
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


//Get all Tags w/ associated products included
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({include:
     [{
       model: Product,

       //will hide tag id from req response
       attributes: {
        exclude: ['id']
       }
      }],
  
    //will hide tag id from req response  
    attributes: {
      exclude: ['id']
    },
  
  });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});




//Get a single Tag by its ID. Includes associated products
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {include:
       [{
         model: Product,

         //will hide tag id from req response
         attributes: {
          exclude: ['id']
         }
        }],

      //will hide tag id from req response
      attributes: {
        exclude: ['id']
      },
    
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!',
     });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Create new Tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);
  } catch (err) {
    
    res.status(500).json(err);
  }
});




//Update a Tag by using the Tag's ID 
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with that ID' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});




//Delete a Tag by using the Tag's ID 
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
