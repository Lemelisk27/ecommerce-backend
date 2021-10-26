const router = require('express').Router();
const e = require('express');
const { Category, Product, ProductTag, Tag} = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include:[Product]
  }).then(dbCategory=>{
    if(dbCategory.length){
      res.json(dbCategory)
    }
    else {
      res.status(404).json({message:"No Categories Found"})
    }
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message:"An Error Occured",err:err})
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id,{
    include:[Product]
  }).then((dbCategory)=>{
    if(dbCategory){
      res.json(dbCategory)
    }
    else {
      res.status(404).json({message:"No Categories Found"})
    }
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message:"An Error Occured",err:err})
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then((newCat)=>{
    res.json(newCat)
  }).catch((err)=>{
    console.log(err)
    res.status(500).json({message:"An Error Occured",err:err})
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then((updateCat)=>{
    res.json(updateCat)
  }).catch((err)=> {
    console.log(err)
    res.status(500).json({message:"An error Occored",err:err})
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then((deleteCat)=>{
    res.json(deleteCat)
  }).catch((err)=>{
    console.log(err)
    res.status(500).json({message:"An Error Occured",err:err})
  })
});

module.exports = router;
