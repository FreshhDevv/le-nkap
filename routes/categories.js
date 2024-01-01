const { Category, validate} = require('../models/category')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const categories = await Category.find().sort('name')
    res.send(categories)
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }
    let category = new Category({
        name: req.body.name,
        image: req.body.image,
        type: req.body.type
    })
    category = await category.save()
    res.send(category)
})

module.exports = router