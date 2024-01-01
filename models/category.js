const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    image: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['expense', 'income']
    }
})

const Category = mongoose.model('Category', categorySchema)

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        image: Joi.string().required(),
        type: Joi.string().required()
    })
    return schema.validate(category)
}

exports.Category = Category
exports.validate = validateCategory