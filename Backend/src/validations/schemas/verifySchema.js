const Joi = require('joi')
const schema = Joi.object({
    pid:Joi.number().required(),
    operation:Joi.string().valid('verify','transfer').required(),
    status:Joi.string().valid('Verified','Defective').required()
}).unknown()
module.exports = schema