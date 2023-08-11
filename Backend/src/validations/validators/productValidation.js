const schema = require('../schemas/productSchema')
function productValidation (req,res,next){
    const {error,value} = schema.validate(req.body,{abortEarly:false})
    if(error){
        console.log('Error')
        res.status(404).json({error:error.message})
    }
    else{
        console.log(value)
        console.log('Next')
        next()
    }
}
module.exports = productValidation