const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[Product]
  }).then(dbTag=>{
    if(dbTag.length){
      res.json(dbTag)
    }
    else {
      res.status(404).json({message:"No Tags Found"})
    }
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message:"An Error Occured",err:err})
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id,{
    include:[Product]
  }).then((dbTag)=>{
    if(dbTag){
      res.json(dbTag)
    }
    else {
      res.status(404).json({message:"No Tag Found"})
    }
  }).catch((err)=>{
    console.log(err)
    res.status(500).json({message:"An Error Occured",err:err})
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then((newTag)=>{
    res.json(newTag)
  }).catch((err)=>{
    console.log(err)
    res.status(500).json({message:"An Error Occured",err:err})
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then((updateTag) => {
    res.json(updateTag)
  }).catch((err)=>{
    console.log(err)
    res.status(500).json({message:"An Error Occured",err:err})
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then((delTag)=>{
    res.json(delTag)
  }).catch((err)=>{
    res.status(500).json({message:"An Error Occured",err:err})
  })
});

module.exports = router;
