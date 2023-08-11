const Joi = require('joi')
const schema = Joi.object({
  
    name:Joi.string().required(),
    battery:Joi.string().required(),
    camera:Joi.string().required(),
    price:Joi.number().min(1000).max(1000000).required(),
    operation:Joi.string().valid('create','transfer').required()
}).unknown()
module.exports = schema 