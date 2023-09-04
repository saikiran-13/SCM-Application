const { Gateway} = require('fabric-network');
const { enrollOrgUser } = require('./enrollclient')
const channelName = process.env.CHANNEL_NAME || 'channel1'
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';


async function connectToFabric(username,password,organization){
    const { ccp, walletOrg,UserId } = await enrollOrgUser(username,password,organization)
    const gateway = new Gateway();

    await gateway.connect(ccp, {
        wallet: walletOrg,
        identity: UserId,
        discovery: { enabled: true, asLocalhost: true }
    });


    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    return {contract,gateway}
}
module.exports = {connectToFabric}

