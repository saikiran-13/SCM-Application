const Joi = require('joi')
const schema = Joi.object({
    pid:Joi.number().required(),
    name:Joi.string().required(),

}).unknown()
module.exports = schema