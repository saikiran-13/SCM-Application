const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');

const { buildCAClient,registerUser,enrollUser} = require('../../../test-application/javascript/CAUtil.js');
const { buildCCPOrg,buildWallet } = require('../../../test-application/javascript/AppUtil.js');


const walletPath = path.join(__dirname, 'wallet');

async function walletcreation(){
	const ccp = buildCCPOrg('org3')
    const caClient = buildCAClient(FabricCAServices, ccp, `ca.org3.example.com`);
    const walletOrg = await buildWallet(Wallets, walletPath + `/org3`);
	return {ccp,caClient,walletOrg}
}

async function registerOrgUser(userId,UserPasswd){
    const {caClient,walletOrg} = await walletcreation()
    console.log("HHHHHHHHHHHHHHHHHHHHHHHhhhhh")
    const secret = await registerUser(caClient, walletOrg, userId, 'org3.department1');
    return {userId,UserPasswd,caClient,walletOrg,secret}
}

async function enrollOrgUser(userId,UserPasswd,secret){
    const {caClient,walletOrg} = await walletcreation()
    const res = await enrollUser(caClient,walletOrg,userId,secret,"Org3MSP")

}

    module.exports = {registerOrgUser,enrollOrgUser}