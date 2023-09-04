const {  Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, enrollUser } = require('../../../test-application/javascript/CAUtil.js');
const { buildCCPOrg, buildWallet } = require('../../../test-application/javascript/AppUtil.js');


const walletPath = path.join(__dirname, 'wallet');


const organizationsMSP = {
	org1: 'Org1MSP',
	org2: 'Org2MSP',
	org3: 'Org3MSP'
  };


async function enrollOrgUser(UserId,userPasswd,org) {
		const orgMSP = organizationsMSP[org]
		const ccp = buildCCPOrg(org);
		const caClient = buildCAClient(FabricCAServices, ccp, `ca.${org}.example.com`);
		console.log("111111111111111111111111111.................................e")
		const walletOrg = await buildWallet(Wallets, walletPath + `/${org}`);
		console.log("2222222222222222222222222222.................................e")
        const Identity = await enrollUser(caClient, walletOrg,UserId,userPasswd, orgMSP);
		console.log("333333333333333333333333333.................................e")
		return {ccp,walletOrg,UserId,Identity,orgMSP}
    }

module.exports = {enrollOrgUser}