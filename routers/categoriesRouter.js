const fs = require('fs');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const request = require('request');
const axios = require('axios');
const dotenv = require('dotenv');
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/urlModel');
const Blog = require('../models/blogModel');
const Categories = require('../models/categoriesModel');
const cheerio = require('cheerio');
const ytdl = require('ytdl-core');
const midtransClient = require('midtrans-client');
const isAdmin = require('../utils.js')
const isAuth = require('../utils.js')


console.log('isAdmin', isAdmin)
console.log('isAuth', isAuth)
 

dotenv.config()

const categoriesRouter = express.Router();


categoriesRouter.get('/seed',
  expressAsyncHandler(async (req, res) => {
    //remove previous data
    // await User.remove({})
    const createdCategories = await Categories.insertMany(data.categories)
    res.send({createdCategories})
  })
)

categoriesRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const category = await Categories.find({});
    res.send(category);
  })
);

categoriesRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    console.log('req', req.params)
    const category = await Categories.findById(req.params.id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ message: 'Category Not Found' });
    }
  })
);

categoriesRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const category = new Categories({
      name: req.body.newData.name,
      image: req.body.newData.image,
    });
    const createdCategories = await category.save();
    res.send({
      _id: createdCategories._id,
      name: createdCategories.name,
      image: createdCategories.image,
    });
  })
);

categoriesRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = await Categories.findById(req.params.id);
    if (category) {
      const deleteCategory = await category.remove();
      res.send({ message: 'Categories Deleted', category: deleteCategory });
    } else {
      res.status(404).send({ message: 'Categories Not Found' });
    }
  })
);

categoriesRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Categories.findById(categoryId);
    if (category) {
      category.name = req.body.name;
      category.image = req.body.image;
      const updatedCategory = await category.save();
      res.send({ message: 'category Updated', category: updatedCategory });
    } else {
      res.status(404).send({ message: 'Category Not Found' });
    }
  })
);

module.exports = categoriesRouter
