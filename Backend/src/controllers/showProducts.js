const {viewProducts} = require('../../fabric-samples/asset-transfer-basic/application-javascript/viewProduct')
const decodeSecretKey = require('../../utils/decodeSecretKey')
const organizations = require('../../utils/constants/organizations')

const showProducts = async (req,res) =>{
    const {username,organization} = req.user;
    const secretKey = await decodeSecretKey(username)
    console.log(req.user)
    const response = await viewProducts(username,secretKey,organizations[organization])
    res.send(response)
}   
module.exports = showProducts