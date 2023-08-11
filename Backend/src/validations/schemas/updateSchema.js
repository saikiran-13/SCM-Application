const Joi = require('joi')
const schema = Joi.object({
    id:Joi.number().required(),
    operation:Joi.string().valid('update','transfer').required(),
}).unknown()
module.exports = schema