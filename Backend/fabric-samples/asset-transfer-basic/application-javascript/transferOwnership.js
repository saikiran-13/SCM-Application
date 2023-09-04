
const { connectToFabric } = require('./utils/connectFabric')

async function transferOwnership(pid, owner, username, password, organization) {

    const { contract,gateway } = await connectToFabric(username, password, organization)

    try {
        console.log('\n--> Submit Transaction: TransferOwnership,Set the Product Ownership as the user');
        let result = await contract.submitTransaction('TransferOwnership', pid, owner);
        console.log('*** Result: committed', result);
        return result.toString()

    }
    catch (error) {
        console.error(error.message)
    }

    finally {
        gateway.disconnect()
    }
}

module.exports = { transferOwnership }